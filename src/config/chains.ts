import { arbitrum, arbitrumGoerli, mainnet, polygonMumbai } from '@wagmi/chains'
import { sample } from 'lodash'

export const TEST_CHAINS = [arbitrumGoerli, polygonMumbai]
export const MAINNET_CHAINS = [arbitrum, mainnet]
export const CHAINS = [...TEST_CHAINS, ...MAINNET_CHAINS]
export const CHAINS_IDS = CHAINS.map((chain) => chain.id)

export enum SuppportedChainId {
  ARBITRUM_CHAIN_ID = arbitrum.id,
  ARBITRUM_GOERLI_CHAIN_ID = arbitrumGoerli.id,
}

export const DEFAULT_CHAIN_ID = arbitrumGoerli.id

export const MAX_GAS_PRICE_MAP: { [key in SuppportedChainId]: string } = {
  [SuppportedChainId.ARBITRUM_CHAIN_ID]: '0',
  [SuppportedChainId.ARBITRUM_GOERLI_CHAIN_ID]: '0',
}

export const GAS_PRICE_ADJUSTMENT_MAP: { [key in SuppportedChainId]: string } = {
  [SuppportedChainId.ARBITRUM_CHAIN_ID]: '0',
  [SuppportedChainId.ARBITRUM_GOERLI_CHAIN_ID]: '0',
}

export const CHAIN_PER_BLOCK = {
  [SuppportedChainId.ARBITRUM_CHAIN_ID]: 1,
  [SuppportedChainId.ARBITRUM_GOERLI_CHAIN_ID]: 1,
}

export const RPC_URLS = {
  [SuppportedChainId.ARBITRUM_CHAIN_ID]: ['https://arb1.arbitrum.io/rpc', 'https://arb-mainnet.g.alchemy.com/v2/EmVYwUw0N2tXOuG0SZfe5Z04rzBsCbr2'],
  [SuppportedChainId.ARBITRUM_GOERLI_CHAIN_ID]: ['https://arbitrum-goerli.public.blastapi.io'],
}

export const RPC_PROVIDERS = {
  [SuppportedChainId.ARBITRUM_CHAIN_ID]: [RPC_URLS[SuppportedChainId.ARBITRUM_CHAIN_ID][0]],
  [SuppportedChainId.ARBITRUM_GOERLI_CHAIN_ID]: [RPC_URLS[SuppportedChainId.ARBITRUM_GOERLI_CHAIN_ID][0]],
}

export const FALLBACK_PROVIDERS = {
  [SuppportedChainId.ARBITRUM_CHAIN_ID]: [RPC_URLS[SuppportedChainId.ARBITRUM_CHAIN_ID][1]],
  [SuppportedChainId.ARBITRUM_GOERLI_CHAIN_ID]: [RPC_URLS[SuppportedChainId.ARBITRUM_GOERLI_CHAIN_ID][1]],
}

export const CHAIN_INFO = {
  [SuppportedChainId.ARBITRUM_CHAIN_ID]: arbitrum,
  [SuppportedChainId.ARBITRUM_GOERLI_CHAIN_ID]: arbitrumGoerli,
}

export function getRpcUrl(chainId: number): string | undefined {
  return sample(RPC_PROVIDERS[chainId as keyof typeof RPC_PROVIDERS])
}

export function getFallbackRpcUrl(chainId: number): string | undefined {
  return sample(FALLBACK_PROVIDERS[chainId as keyof typeof FALLBACK_PROVIDERS])
}

export type CHAINIDS = keyof typeof CHAIN_INFO

export function getChainInfo(chainId: keyof typeof CHAIN_INFO) {
  return CHAIN_INFO[chainId]
}

export function getExplorerUrl(chainId: number) {
  const chainInfo = getChainInfo(chainId as any)
  return chainInfo.blockExplorers.etherscan.url ?? 'https://etherscan.io/'
}
