import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body className={`font-sourcesanspro dark:bg-gray-900 dark:text-white primary-scroll-light dark:primary-scroll-dark`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}