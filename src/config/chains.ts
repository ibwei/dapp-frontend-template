import { arbitrum, arbitrumGoerli, mainnet, polygonMumbai } from '@wagmi/chains'
import { sample } from 'lodash'

export const TEST_CHAINS = [arbitrumGoerli, polygonMumbai]
export const MAINNET_CHAINS = [arbitrum, mainnet]
export const CHAINS = process.env.NEXT_PUBLIC_SHOW_TESTNET ? [...TEST_CHAINS, ...MAINNET_CHAINS] : MAINNET_CHAINS
export const CHAINS_IDS = CHAINS.map((chain) => chain.id)

export enum SupportedChainId {
  ARBITRUM_CHAIN_ID = arbitrum.id,
  ARBITRUM_GOERLI_CHAIN_ID = arbitrumGoerli.id,
}

export const DEFAULT_CHAIN_ID = process.env.NEXT_PUBLIC_SHOW_TESTNET ? arbitrumGoerli.id : arbitrum.id

export const MAX_GAS_PRICE_MAP: { [key in SupportedChainId]: string } = {
  [SupportedChainId.ARBITRUM_CHAIN_ID]: '0',
  [SupportedChainId.ARBITRUM_GOERLI_CHAIN_ID]: '0',
}

export const GAS_PRICE_ADJUSTMENT_MAP: { [key in SupportedChainId]: string } = {
  [SupportedChainId.ARBITRUM_CHAIN_ID]: '0',
  [SupportedChainId.ARBITRUM_GOERLI_CHAIN_ID]: '0',
}

export const CHAIN_PER_BLOCK = {
  [SupportedChainId.ARBITRUM_CHAIN_ID]: 1,
  [SupportedChainId.ARBITRUM_GOERLI_CHAIN_ID]: 1,
}

export const RPC_URLS = {
  [SupportedChainId.ARBITRUM_CHAIN_ID]: ['https://arb1.arbitrum.io/rpc', 'https://arb-mainnet.g.alchemy.com/v2/EmVYwUw0N2tXOuG0SZfe5Z04rzBsCbr2'],
  [SupportedChainId.ARBITRUM_GOERLI_CHAIN_ID]: ['https://arbitrum-goerli.public.blastapi.io'],
}

export const RPC_PROVIDERS = {
  [SupportedChainId.ARBITRUM_CHAIN_ID]: [RPC_URLS[SupportedChainId.ARBITRUM_CHAIN_ID][0]],
  [SupportedChainId.ARBITRUM_GOERLI_CHAIN_ID]: [RPC_URLS[SupportedChainId.ARBITRUM_GOERLI_CHAIN_ID][0]],
}

export const FALLBACK_PROVIDERS = {
  [SupportedChainId.ARBITRUM_CHAIN_ID]: [RPC_URLS[SupportedChainId.ARBITRUM_CHAIN_ID][1]],
  [SupportedChainId.ARBITRUM_GOERLI_CHAIN_ID]: [RPC_URLS[SupportedChainId.ARBITRUM_GOERLI_CHAIN_ID][1]],
}

export const CHAIN_INFO = {
  [SupportedChainId.ARBITRUM_CHAIN_ID]: arbitrum,
  [SupportedChainId.ARBITRUM_GOERLI_CHAIN_ID]: arbitrumGoerli,
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
