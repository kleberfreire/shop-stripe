import * as React from 'react';
import { createContext } from "react";

interface itemCart  {
  id: string,
  name: string,
  price: number,
  quantity: number,
  imageUrl: string
  // currency: "GBP",
}

interface shoppingCartContextProps {
  cartList: itemCart[] | []
  handleAddInCart: (item: itemCart) => void
  handleRemoveInCart: (id: string) => void
}

interface shoppingCartProviderProps {
  children: React.ReactNode
}



export const ShoppingCartContext = createContext({} as shoppingCartContextProps)


export function ShoppingCartProvider({children}: shoppingCartProviderProps) {
  const [cartList, setCartList] = React.useState<itemCart[]>([])
  
  function handleAddInCart(item: itemCart) {
    setCartList(prevState => {
      const isExistingInCart = prevState.findIndex(i => i.id === item.id)
      if(isExistingInCart > -1) {
        return prevState.map(i => {
          if(i.id === item.id) { 
            return {
              ...i,
              quantity: i.quantity++
            }
          }
          return i
        })
      }
      return [...prevState, item]
    })
  }
  function handleRemoveInCart(id: string) {
    setCartList(prevState => prevState.filter(item => item.id !== id))
  }


  return <>
    <ShoppingCartContext.Provider 
      value={{  
        cartList,
        handleAddInCart,
        handleRemoveInCart
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  </>
} 