import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/Header'
import { SessionProvider } from "next-auth/react"
import { ThemeContextProvider } from '../contexts/ThemeContext'
import { MenuContextProvider } from '../contexts/MenuContext'
import { SearchContextProvider } from '../contexts/SearchContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FavoriteContextProvider } from '../contexts/FavoriteContext'
import { useState } from 'react'
import Nav from '../components/Nav'
import { ModalContextProvider } from '../contexts/ModalContext'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      }
    }
  }))

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
                    <Analytics />
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
