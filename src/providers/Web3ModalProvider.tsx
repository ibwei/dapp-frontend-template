import { CHAINS } from 'config'
import { ReactNode, useEffect, useState } from 'react'
import { WagmiConfig } from 'wagmi'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

interface Props {
  children: ReactNode
}

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''
if (!projectId) {
  console.warn('You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')
}

// const { chains, publicClient, webSocketPublicClient } = configureChains(CHAINS, [publicProvider(), w3mProvider({ projectId: projectId })])

const wagmiConfig = defaultWagmiConfig({
  chains: CHAINS,
  projectId,
  metadata: {
    name: 'Wagmi Test Demo',
    description: 'Wagmi Test Demo',
    url: 'https://wagmi.io',
    icons: ['https://wagmi.io/favicon.ico'],
  },
})

createWeb3Modal({
  wagmiConfig,
  projectId: projectId,
  chains: CHAINS,
  themeMode: 'light',
  themeVariables: {
    '--w3m-z-index': 99999,
    '--w3m-font-family': 'sans-serif',
  },
})

// const ethereumClient = new EthereumClient(wagmiConfig, chains)

export const Web3ModalProvider: React.FC<Props> = (props) => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      {ready && <WagmiConfig config={wagmiConfig}>{props.children}</WagmiConfig>}

      {/* <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode={colorMode}
        enableAccountView={true}
        themeVariables={{
          '--w3m-z-index': '99999',
          '--w3m-font-family': 'sans-serif',
          '--w3m-background-color': colorMode === 'dark' ? THEME_CONFIG.colors.dark.primary : THEME_CONFIG.colors.light.primary,
          '--w3m-accent-color': colorMode === 'dark' ? THEME_CONFIG.colors.dark.primary : THEME_CONFIG.colors.light.primary,
          '--w3m-accent-fill-color': colorMode === 'dark' ? '#040A2D' : 'white',
        }}
      /> */}
    </>
  )
}
