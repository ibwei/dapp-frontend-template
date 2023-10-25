import type { AppProps } from 'next/app'

import { appWithTranslation } from 'next-i18next'

import 'focus-visible/dist/focus-visible'
import { ToastContainer } from 'react-toastify'

import { Layout } from 'components/Layouts'
import { NextSEO } from 'components/Layouts/NextSEO'

import { Providers } from 'providers'
import TransactionUpdater from '../state/transactions/updater'

import 'styles/globals.css'
import 'styles/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'

function App({ Component, pageProps }: AppProps<{ initialReduxState: any }>) {
  return (
    <Providers pageProps={pageProps}>
      <NextSEO />
      <TransactionUpdater />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeOnClick
        limit={3}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        style={{ zIndex: 99999 }}
      />
    </Providers>
  )
}

export default appWithTranslation(App)
