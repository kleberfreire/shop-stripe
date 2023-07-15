import { stripe } from "@/lib/stripe";
import { ImageContainer, ImagesListContainer, SuccessContainer } from "@/styles/pages/success";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next/types";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string
  product: Stripe.LineItem[]
}

export default function Success({customerName, product}: SuccessProps) {
 
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

    <SuccessContainer>
      <h1>Compra efetuada!</h1>
      <ImagesListContainer>
        {product.map((p )=> {
          return (<ImageContainer key={p.id}>
            {/* @ts-ignore */}
            <Image src={`${p?.price?.product?.images[0]}`} alt="" width={120} height={110}/>
          </ImageContainer>)
        })}
      </ImagesListContainer>
      {/* <ImageContainer>
        <Image src={product.image} alt="" width={120} height={110}/>
      </ImageContainer> */}
      <p>Uhuul <strong>{customerName}</strong>, sua compra de {product.length} camisetas já está a caminho da sua casa. </p>
      <Link href="/">
        Voltar ao catálogo
      </Link>
    </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  
    if(!query.session_id) {
      return {
        notFound: true
      }
    }
  
  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details?.name
  // const product = session.line_items?.data[0].price?.product as Stripe.Product
  const product = session.line_items?.data as Stripe.LineItem[]

  return {
    props: {
      customerName,
      // product: {
      //   name: product?.name,
      //   image: product.images[0]
      // },
      product
    }
  }
}