import * as React from 'react';
import { CartPage, Container, ContainerCart, ContainerInfo, ContainerItem, Header, ImageContainer, ShoppingCart } from '@/styles/components/layout';
import Image from 'next/image';

import logoImg from '@/assets/logo.svg'
import iconCart from '@/assets/iconCart.svg'
import closeIcon from '@/assets/closeIcon.svg'

import Link from 'next/link'

import { ShoppingCartContext } from '@/contexts'
import { useContext, useState } from 'react'

interface Layout {
  children: React.ReactElement<any, any>
}

export function Layout({ children }: Layout) {
  const [ openCart, setOpenCart] = useState(false)

  const { cartList, handleRemoveInCart } = useContext(ShoppingCartContext)
  return (
    <>
      <Container>
        <Header>
          <Link href='/'>
            <img src={logoImg.src} alt="Logo Ignite Shop" />
          </Link>
          <ShoppingCart color='active' onClick={() => setOpenCart(true)}>
            <img src={iconCart.src} alt='Ícone carrinho de compras' />
            <span>{cartList.length}</span>
          </ShoppingCart>
        </Header>
        {children}
      </Container>
      <CartPage opener={openCart ? 'open' : 'close'}>
          <div>
           <button onClick={() => setOpenCart(false)}><img src={closeIcon.src} alt="close" /></button> 
          </div>
        <ContainerCart> 
          
          {cartList.length > 0 && cartList.map((cartItem, index) =>{
            return (
            <ContainerItem key={index}>
              <ImageContainer>
                <Image src={cartItem.imageUrl} width={90} height={85} alt=""/>
              </ImageContainer>
              <ContainerInfo>
                <h2>Camiseta Beyond the Limits</h2>
                <span>R$ 79,90</span>
                <button onClick={() => handleRemoveInCart(cartItem.id)}>Remover</button>
              </ContainerInfo>
            </ContainerItem>)
          })}
        </ContainerCart>
        </CartPage> 
    </>
  )
}
