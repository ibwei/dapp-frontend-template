import { ColorModeScript } from '@chakra-ui/react'
import { THEME_INITIAL_COLOR } from 'config/theme'
import { i18n } from 'next-i18next'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  // hack for styled-components stylesheet update
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props}></App>),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      }
    } finally {
      sheet.seal()
    }
  }
  render(): JSX.Element {
    return (
      <Html lang={i18n?.language ?? 'en'}>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          {/* <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500&display=swap" rel="stylesheet" /> */}
          {/* <Script src="/charting_library/charting_library.standalone.js" strategy="beforeInteractive" /> */}
        </Head>
        <body>
          <ColorModeScript initialColorMode={THEME_INITIAL_COLOR} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
