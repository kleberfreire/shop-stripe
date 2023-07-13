import * as React from 'react';
import { createContext, useReducer } from "react";

interface itemCart  {
  id: string,
  name: string,
  price: number,
  quantity: number,
  imageUrl: string
  // currency: "GBP",
}


interface shoppingCartProviderProps {
  children: React.ReactNode
}

enum actionsPayload {
  ADD_PRODUCT = 'ADD_PRODUCT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
}

interface shoppingCartStateProps {
  cartList: itemCart[] | []
  amount: number,
  total: number
}
interface shoppingCartActionProps {
  type: actionsPayload
  payload: any
}

interface shoppingCartContextProps {
  state: shoppingCartStateProps
  handleAddInCart: (item: itemCart) => void
  handleRemoveInCart: (id: string) => void
}


export const ShoppingCartContext = createContext({} as shoppingCartContextProps)


export function ShoppingCartProvider({children}: shoppingCartProviderProps) {
  // const [cartList, setCartList] = React.useState<itemCart[]>([])
  const [state, dispatch] = useReducer(shoppingCartReducer, { 
    cartList: [],
    amount: 0,
    total: 0
  });

  function shoppingCartReducer(state: shoppingCartStateProps, action: shoppingCartActionProps) {
    const { type, payload } = action;
    switch (type) {
      case actionsPayload.ADD_PRODUCT:
        const isExistingInCart = state.cartList.findIndex(i => i.id === payload.id)
        if(isExistingInCart > -1) {
          return state
        }
        return {
          ...state,
          cartList: [...state.cartList, payload],
          amount: [...state.cartList, payload].length,
          total: 0
        } 
      case actionsPayload.REMOVE_PRODUCT:
        return {
          ...state,
          cartList: state.cartList.filter(item => item.id !== payload),
          amount: state.cartList.filter(item => item.id !== payload).length,
          total: 0
        };
      default:
        return state;
    }
  }


  function handleAddInCart(item: itemCart) {
    dispatch({type: actionsPayload.ADD_PRODUCT, payload: item})
    // setCartList(prevState => {
    //   const isExistingInCart = prevState.findIndex(i => i.id === item.id)
    //   if(isExistingInCart > -1) {
    //     return prevState.map(i => {
    //       if(i.id === item.id) { 
    //         return {
    //           ...i,
    //           quantity: i.quantity++
    //         }
    //       }
    //       return i
    //     })
    //   }
    //   return [...prevState, item]
    // })
  }
  function handleRemoveInCart(id: string) {
    dispatch({type: actionsPayload.REMOVE_PRODUCT, payload: id})
    // setCartList(prevState => prevState.filter(item => item.id !== id))
  }


  return <>
    <ShoppingCartContext.Provider 
      value={{  
        state,
        handleAddInCart,
        handleRemoveInCart
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  </>
} 