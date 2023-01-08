import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/Header'
import { SessionProvider } from "next-auth/react"
import { ThemeContextProvider } from '../contexts/ThemeContext'
import { MenuContextProvider } from '../contexts/MenuContext'
import { SearchContextProvider } from '../contexts/SearchContext'
import { QueryClientProvider, QueryClient } from 'react-query'
import { FavoriteContextProvider } from '../contexts/FavoriteContext'
import { useState } from 'react'
import Nav from '../components/Nav'
import { ModalContextProvider } from '../contexts/ModalContext'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <Head>
        <title>LcsAnimeList</title>
      </Head>

      <SessionProvider session={session}>
        <ThemeContextProvider>
          <MenuContextProvider>
            <QueryClientProvider client={queryClient}>
              <SearchContextProvider>
                <FavoriteContextProvider>
                  <ModalContextProvider>
                    <Header />
                    <Nav />
                    <Component {...pageProps} />
                  </ModalContextProvider>
                </FavoriteContextProvider>
              </SearchContextProvider>
            </QueryClientProvider>
          </MenuContextProvider>
        </ThemeContextProvider>
      </SessionProvider>
    </>
  )
}
