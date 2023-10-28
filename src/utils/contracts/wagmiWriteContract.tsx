import { Flex, Text } from '@chakra-ui/react'
import { getNetwork, switchNetwork, waitForTransaction, writeContract } from '@wagmi/core'
import { chain } from 'lodash'
import { Trans } from 'next-i18next'
import { TransactionExecutionError } from 'viem'
import ExternalLink from '../../components/ExternalLink/ExternalLink'
import { getExplorerUrl } from '../../config/chains'
import { helperToast } from '../helperToast'
import { NETWORK_CHANGED, NOT_ENOUGH_FUNDS, RPC_ERROR, SLIPPAGE, USER_DENIED, extractError } from './transactionErrors'

export async function wagmiWriteContract(
  callParams: {
    address: string
    abi: any
    functionName: string
    args: any[]
    chainId: number
    value?: string
  },
  opts: {
    setIsPending: any
    sentMsg?: string
    successMsg?: string
    hideSuccessMsg?: boolean
    failMsg?: string
  }
) {
  const { chains } = getNetwork()

  try {
    opts.setIsPending(() => true)
    // txnOpts.gasLimit = opts.gasLimit ? opts.gasLimit : await getGasLimit(contract, method, params, opts.value)

    // await setGasPrice(txnOpts, contract?.provider as any, chainId)
    const { hash } = await writeContract(callParams as any)
    const prefix = getExplorerUrl(callParams.chainId)
    const suffix = prefix.endsWith('/') ? `tx/${hash}` : `/tx/${hash}`
    const txUrl = `${prefix}${suffix}`

    const sentMsg = opts?.sentMsg || `Transaction sent.`

    helperToast.success(
      <Flex flexFlow="column nowrap" justifyContent="flex-start" alignItems="flex-start">
        <Text fontFamily="Lexend" mr="6px">
          {' '}
          {sentMsg}
        </Text>
        <ExternalLink href={txUrl}>View transaction on chain.</ExternalLink>
      </Flex>
    )

    const receipt = await waitForTransaction({ hash: hash })

    if (receipt) {
      const message = opts?.hideSuccessMsg ? undefined : opts?.successMsg || `Transaction completed!`
      if (receipt.status === 'reverted') {
        helperToast.error(
          <Flex flexFlow="column nowrap" justifyContent="flex-start" alignItems="flex-start">
            <Text fontFamily="Lexend" mr="6px">
              Transaction Failed.
            </Text>
          </Flex>
        )
      }
      if (receipt.status === 'success' && message) {
        helperToast.success(
          <Flex flexFlow="column nowrap" justifyContent="flex-start" alignItems="flex-start">
            {message}
          </Flex>
        )
      }
    }

    return receipt
  } catch (e: unknown) {
    let failMsg

    if (e instanceof TransactionExecutionError) {
      console.log(e.details)
      const [message, type, errorData] = extractError(e as any)
      switch (type) {
        case NOT_ENOUGH_FUNDS:
          failMsg = <Trans>There is not enough gas fee in your account on {chain.name} to send this transaction.</Trans>
          break
        case NETWORK_CHANGED:
          failMsg = (
            <Trans>
              <div>Your wallet is not connected to {chain.name}.</div>
              <br />
              <div className="clickable underline" onClick={() => switchNetwork({ chainId: callParams.chainId })}>
                Switch to {chains[callParams.chainId]?.name}
              </div>
            </Trans>
          )
          break
        case USER_DENIED:
          failMsg = `Transaction was cancelled.`
          break
        case SLIPPAGE:
          failMsg = `The mark price has changed, consider increasing your Allowed Slippage by clicking on the "..." icon next to your address.`
          break
        case RPC_ERROR:
          const originalError = errorData?.error?.message || errorData?.message || message

          failMsg = (
            <div>
              <Trans>
                Transaction failed due to RPC error.
                <br />
                <br />
                Please try changing the RPC url in your wallet settings.
              </Trans>
              <br />
              {originalError && { originalError }}
            </div>
          )
          break
        default:
          failMsg = e.details
      }
    }

    helperToast.error(<Text fontFamily="Lexend">{failMsg}</Text>, { autoClose: false })
    throw e
  } finally {
    opts.setIsPending(() => false)
  }
}
