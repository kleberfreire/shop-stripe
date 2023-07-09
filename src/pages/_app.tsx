import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/global'
import Head from 'next/head'

import { CartProvider } from 'use-shopping-cart'
import { ShoppingCartContext, ShoppingCartProvider } from '@/contexts'
import { useContext } from 'react'
import { Layout } from '@/layout'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  
  // const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  // const cancelUrl = `${process.env.NEXT_URL}/`
  const { cartList } = useContext(ShoppingCartContext)


  return (
    <>
      <Head>
        <title>Ignite Shop</title>
        <meta name="description" content="Ignite Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe={'test'}
        successUrl={`${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`}
        cancelUrl={`${process.env.NEXT_URL}/`}
        currency="BRL"
        allowedCountries={['BRL']}
        // Enables local storage
        shouldPersist={true}
      >
        <ShoppingCartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          </ShoppingCartProvider>
        </CartProvider>
    </>
  )
}
