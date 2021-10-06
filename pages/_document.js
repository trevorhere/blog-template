// _document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document"
import {GA_TAG} from '../googleAnalytics'
const isProd = process.env.NODE_ENV === 'production'
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;800&display=swap"
            rel="stylesheet"
          />
          {/* <link rel="icon" type="image/png" href="./favicon.png" /> */}

          {/* Analytics - Loaded only on prod */}
          { isProd ? (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TAG}`}></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_TAG}');
               `,
                }}
              />
            </>
          ): null}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}