import * as React from 'react';
import { CartPage, Container, ContainerCart, ContainerInfo, ContainerItem, ContainerTotal, Header, ImageContainer, ShoppingCart } from '@/styles/components/layout';
import Image from 'next/image';

import logoImg from '@/assets/logo.svg'
import iconCart from '@/assets/iconCart.svg'
import closeIcon from '@/assets/closeIcon.svg'

import Link from 'next/link'

import { ShoppingCartContext } from '@/contexts'
import { useContext, useState } from 'react'
import { formatePricePtBr } from '@/util/formatPrice';
import axios from 'axios';

interface Layout {
  children: React.ReactElement<any, any>
}

export function Layout({ children }: Layout) {
  const [ openCart, setOpenCart] = useState(false)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const { state, handleRemoveInCart, handleCheckout } = useContext(ShoppingCartContext)

  return (
    <>
      <Container>
        <Header>
          <Link href='/'>
            <img src={logoImg.src} alt="Logo Ignite Shop" />
          </Link>
          <ShoppingCart color='active' onClick={() => setOpenCart(true)}>
            <img src={iconCart.src} alt='Ícone carrinho de compras' />
            <span>{state.cartList.length}</span>
          </ShoppingCart>
        </Header>
        {children}
      </Container>
      <CartPage opener={openCart ? 'open' : 'close'}>
          <div>
           <button onClick={() => setOpenCart(false)}><img src={closeIcon.src} alt="close" /></button> 
          </div>
        <ContainerCart> 
         {state.cartList.length > 0 ?
        (
          <>
          <div>
            {state.cartList.length > 0 && state.cartList.map((cartItem, index) =>{
              return (
              <ContainerItem key={index}>
                <ImageContainer>
                  <Image src={cartItem.imageUrl} width={90} height={85} alt=""/>
                </ImageContainer>
                <ContainerInfo>
                  <h2>{cartItem.name}</h2>
                  <span>{formatePricePtBr(cartItem.price)}</span>
                  <button onClick={() => handleRemoveInCart(cartItem.id)}>Remover</button>
                </ContainerInfo>
              </ContainerItem>)
            })}
          </div>
            <ContainerTotal>
              <div><p>Quantidade</p> <span>{state.cartList.length} {state.cartList.length > 1 ? 'itens': 'item'}</span></div>
              <div><p>Valor total</p> <span>{formatePricePtBr(state.total)}</span></div>
              <button 
                disabled={isCreatingCheckoutSession || state.cartList.length < 1}
                onClick={handleCheckout}
              >
                Finalizar compra
              </button>
            </ContainerTotal>
          </>
          ): (
            <p>Nenhum item no carrinho!</p>
          )}
        </ContainerCart>
        </CartPage> 
    </>
  )
}
