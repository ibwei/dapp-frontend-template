import React from 'react'
import { ChakraProvider } from './ChakraProvider'
import { Web3ModalProvider } from './Web3ModalProvider'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, useStore } from 'state'
import { useIsMounted } from 'hooks/useIsMounted'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'

export const Providers: React.FC<{ pageProps: any; children: React.ReactNode }> = ({ children, pageProps }) => {
  const store = useStore(pageProps?.initialReduxState)
  const isMounted = useIsMounted()

  const Component = isMounted ? children : <span>loading...</span>

  return (
    <ChakraProvider>
      <Web3ModalProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SWRConfig>{Component}</SWRConfig>
          </PersistGate>
        </Provider>
      </Web3ModalProvider>
    </ChakraProvider>
  )
}
