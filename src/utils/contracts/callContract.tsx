import { Contract } from 'ethers'
import { helperToast } from '../helperToast'
import { extractError, NETWORK_CHANGED, NOT_ENOUGH_FUNDS, RPC_ERROR, SLIPPAGE, USER_DENIED } from './transactionErrors'
import { getGasLimit, setGasPrice } from './utils'
import { Trans } from 'next-i18next'
import { switchNetwork } from '@wagmi/core'
import { getNetwork } from '@wagmi/core'
import ExternalLink from '../../components/ExternalLink/ExternalLink'
import { getExplorerUrl } from '../../config/chains'

export async function callContract(
  chainId: number,
  contract: Contract,
  method: string,
  params: any,
  opts: {
    value?: number
    gasLimit?: number
    sentMsg?: string
    successMsg?: string
    hideSuccessMsg?: boolean
    failMsg?: string
  }
) {
  const { chains } = getNetwork()
  try {
    if (!Array.isArray(params) && typeof params === 'object' && opts === undefined) {
      opts = params
      params = []
    }

    if (!opts) {
      opts = {}
    }

    const txnOpts: any = {}

    if (opts.value) {
      txnOpts.value = opts.value
    }

    txnOpts.gasLimit = opts.gasLimit ? opts.gasLimit : await getGasLimit(contract, method, params, opts.value)

    await setGasPrice(txnOpts, contract?.provider as any, chainId)

    const res = await contract[method](...params, txnOpts)
    const txUrl = chains[chainId].blockExplorers?.default.url + 'tx/' + res.hash
    const sentMsg = opts.sentMsg || `Transaction sent.`

    helperToast.success(
      <div>
        {sentMsg}{' '}
        <a href={txUrl} target="_blank" rel="noopener noreferrer">
          <Trans>View status.</Trans>
        </a>
        <br />
      </div>
    )

    const receipt = await res.wait()

    if (receipt) {
      const message = opts.hideSuccessMsg ? undefined : opts.successMsg || `Transaction completed!`
      if (receipt.status === 0) {
        const txUrl = getExplorerUrl(chainId) + 'tx/' + receipt.hash
        helperToast.error(
          <div>
            <Trans>
              Txn failed. <ExternalLink href={txUrl}>View</ExternalLink>
            </Trans>
            <br />
          </div>
        )
      }
      if (receipt.status === 1 && message) {
        const txUrl = getExplorerUrl(chainId) + 'tx/' + receipt.hash
        helperToast.success(
          <div>
            {message}{' '}
            <ExternalLink href={txUrl}>
              <Trans>View</Trans>
            </ExternalLink>
            <br />
          </div>
        )
      }
    }

    return receipt
  } catch (e) {
    let failMsg

    let autoCloseToast: number | boolean = 5000

    const [message, type, errorData] = extractError(e as any)
    switch (type) {
      case NOT_ENOUGH_FUNDS:
        failMsg = (
          <Trans>
            There is not enough ETH in your account on Arbitrum to send this transaction.
            <br />
            <br />
            <a href="https://arbitrum.io/bridge-tutorial/" target="_blank" rel="noopener noreferrer">
              Bridge ETH to Arbitrum
            </a>
          </Trans>
        )
        break
      case NETWORK_CHANGED:
        failMsg = (
          <Trans>
            <div>Your wallet is not connected to {chains[chainId]?.name}.</div>
            <br />
            <div className="clickable underline" onClick={() => switchNetwork({ chainId })}>
              Switch to {chains[chainId]?.name}
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
        autoCloseToast = false

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
        autoCloseToast = false

        failMsg = (
          <div>
            {opts.failMsg || `Transaction failed`}
            <br />
            {message && { message }}
          </div>
        )
    }

    helperToast.error(failMsg, { autoClose: autoCloseToast })
    throw e
  }
}
