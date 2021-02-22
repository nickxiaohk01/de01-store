import { ThemeProvider } from 'next-themes'
import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'
import '@assets/chrome-bug.css'
import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { CartProvider, UIProvider } from '@context'
import { Head } from '@components/common'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <UIProvider>
        <ThemeProvider>
          <CartProvider>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
        </ThemeProvider>
      </UIProvider>
    </>
  )
}
