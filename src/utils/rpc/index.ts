import { useEffect, useState } from 'react'
import { FALLBACK_PROVIDERS, getFallbackRpcUrl, getRpcUrl } from '../../config/chains'
import { JsonRpcProvider, Web3Provider, StaticJsonRpcProvider } from '@ethersproject/providers'

export function getProvider(library: Web3Provider | undefined, chainId: number) {
  if (library) {
    return library.getSigner()
  }

  const provider = getRpcUrl(chainId)

  return new StaticJsonRpcProvider(
    provider,
    // @ts-ignore incorrect Network param types
    { chainId }
  )
}

export function getFallbackProvider(chainId: number) {
  if (!FALLBACK_PROVIDERS[chainId as keyof typeof FALLBACK_PROVIDERS]) {
    return
  }

  const provider = getFallbackRpcUrl(chainId)

  return new StaticJsonRpcProvider(
    provider,
    // @ts-ignore incorrect Network param types
    { chainId }
  )
}

export function useJsonRpcProvider(chainId: number) {
  const [provider, setProvider] = useState<JsonRpcProvider>()

  useEffect(() => {
    async function initializeProvider() {
      const rpcUrl = getRpcUrl(chainId)

      if (!rpcUrl) return

      const provider = new JsonRpcProvider(rpcUrl)

      await provider.ready

      setProvider(provider)
    }

    initializeProvider()
  }, [chainId])

  return { provider }
}
