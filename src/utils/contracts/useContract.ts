import { getContract } from '@wagmi/core'
import { ABI_KEY_LIST, getABI } from 'asserts/ABI'
import { useActiveWeb3React } from 'hooks/useWeb3React'
import { useMemo } from 'react'
import { WalletClient } from 'wagmi'

// get facet contract instance in hooks
export function useContract(address: `0x${string}`, abiName: ABI_KEY_LIST): any {
  const { walletClient, publicClient, chainId } = useActiveWeb3React()

  const contract = useMemo(() => {
    if (address && abiName && walletClient && publicClient) {
      return getContract({ address, abi: getABI(abiName), chainId, walletClient: (walletClient ?? publicClient) as WalletClient })
    }
    return null
  }, [address, abiName, walletClient, publicClient, chainId])

  return contract
}
