import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/styles/theme'
import { SidebarDrawerProvider } from '@/context/SidebarDrawerContext'
import { makeServer } from '@/services/mirage'
import { QueryClient, QueryClientProvider } from 'react-query'

if (process.env.NODE_ENV === 'development'){
  makeServer()
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={ new QueryClient() }>
      <ChakraProvider resetCSS theme={theme} >
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
