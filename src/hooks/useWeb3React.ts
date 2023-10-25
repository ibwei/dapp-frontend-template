import { useWeb3Modal } from '@web3modal/react'
import { CHAINIDS, DEFAULT_CHAIN_ID } from 'config'
import React, { useCallback, useMemo } from 'react'
import { useLocalStorageSerializeKey } from 'utils/localStorage'
import { useAccount, useNetwork, usePublicClient, useSwitchNetwork, useWalletClient } from 'wagmi'

export function useWeb3React() {
  const { chain } = useNetwork()
  const { address, connector, isConnected, isConnecting } = useAccount()

  const [chainId, setChainId] = useLocalStorageSerializeKey<any>('DEFAULT_CHAIN_ID', DEFAULT_CHAIN_ID)

  React.useEffect(() => {
    function initChainId() {
      // set last network or default network when not support
      if (!chain || chain.unsupported) {
        setChainId(chainId)
      }

      // use current network
      if (chain && !chain?.unsupported) {
        setChainId(chain.id)
      }
    }

    initChainId()
  }, [chain, chainId, setChainId])

  const writeContractStatus = useMemo(() => {
    if (chain && !chain.unsupported && isConnected && address) {
      return true
    }
    return false
  }, [address, chain, isConnected])

  return {
    writeContractStatus: writeContractStatus,
    chainId: chainId as CHAINIDS,
    account: address,
    isConnected,
    isConnecting,
    chain: { ...chain, id: chainId },
    connector,
  }
}

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
export const useActiveWeb3React = () => {
  const web3React = useWeb3React()
  const { open } = useWeb3Modal()
  const { chain } = useNetwork()
  const { switchNetworkAsync } = useSwitchNetwork()
  const publicClient = usePublicClient({ chainId: web3React.chainId })
  const { data: walletClient } = useWalletClient({ chainId: web3React.chainId })

  const checkWalletAndNetwork = useCallback(async () => {
    if (!web3React.account) {
      open()
      return false
    }
    if (chain?.unsupported) {
      try {
        switchNetworkAsync && (await switchNetworkAsync(web3React.chainId))
        return true
      } catch (e) {
        console.log('switch network err', e)
        return false
      }
    }
    return true
  }, [web3React.account, web3React.chainId, chain?.unsupported, open, switchNetworkAsync])

  const switchNetwork = useCallback(
    async (chainId: CHAINIDS) => {
      if (!web3React.account) {
        await open()
      }
      if (chain?.id !== chainId) {
        try {
          switchNetworkAsync && (await switchNetworkAsync(chainId))
        } catch (e) {
          console.log('switch network err', e)
        }
      }
    },
    [web3React.account, chain?.id, open, switchNetworkAsync]
  )

  return {
    publicClient,
    walletClient,
    checkWalletAndNetwork,
    ...web3React,
    switchNetwork,
  }
}
