import { GetStaticPaths, GetStaticProps } from "next"
import Image from 'next/image'

import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import { useRouter } from "next/router"
import axios from "axios"
import { useContext, useState } from "react"
import Head from "next/head"
import { ShoppingCartContext } from "@/contexts"
import { useShoppingCart } from "use-shopping-cart"

interface ProductProps {
  product: {
      id: string,
      name: string,
      imagesUrl: string,
      price: number
      priceFormatted: string
      description: string,
      defaultPriceId: string
  }
}

export default  function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { handleAddInCart } = useContext(ShoppingCartContext)
  const { addItem } = useShoppingCart()
  
  if (isFallback) {
    return <div>Loading...</div>
  }
  async function handleByProduct() {

    handleAddInCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imagesUrl,
        quantity: 1,
        defaultPriceId: product.defaultPriceId
      })      
  }

  return (
    <>
      <Head>
        <title>Ignite Shop | {product.name}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
        <Image src={product.imagesUrl} width={520} height={480} alt=""/>
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{ product.priceFormatted }</span>

          <p>{product.description}</p>
          <button onClick={handleByProduct}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  
  const response = await stripe.products.list()
  
  const productsID = response.data.map((product) => ({ params: { id: product.id} }))
  return {
    paths: productsID,
    fallback: true
  }
}


export const getStaticProps: GetStaticProps<any, { id: string }> = async ({params}) => {
  
  
  const productId = params?.id || ''
  
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'] 
  })

  const price = product.default_price as Stripe.Price
 

  return {
    props: {
      product: {
      id: product.id,
      name: product.name,
      description: product.description,
      imagesUrl: product.images[0],
      priceFormatted: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format((price.unit_amount as number / 100)),
      price: (price.unit_amount as number / 100),
      defaultPriceId: price.id
    }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}