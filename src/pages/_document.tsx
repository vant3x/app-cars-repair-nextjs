import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

    render() {
        return (
          <Html>
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/assets/logo-icon/icon-192x192.png" />
                <meta name="theme-color" content="#0070F3" />
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        )
      }

}

export default MyDocument;