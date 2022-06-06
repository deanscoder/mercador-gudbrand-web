import React from 'react'
import Document, {
  DocumentInitialProps,
  DocumentContext,
  Html,
  Head,
  NextScript,
  Main
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const google = `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-TSMBNDVVVH');`

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />
          <meta name="author" content="Ezequiel Andrade @servosalt" />
          <script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
          <script src="https://smtpjs.com/v3/smtp.js"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600&display=swap" rel="stylesheet"></link><link rel="stylesheet" href="https://use.typekit.net/wjj1sol.css" />
          <meta property="og:site_name" content='Mercado Gudbrand' />
          <meta property="og:author" content='Ezequiel Andrade' />
          <meta property="og:type" content='website' />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-TSMBNDVVVH"></script>
          <script dangerouslySetInnerHTML={{ __html: google }}></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
