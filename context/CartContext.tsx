import React, { FC, useMemo } from 'react'

type Choices = {
  size: string
  color: string
  paymentType: string
}

type CartAction = {
  type: 'ADD_ITEMS'
  data: {
    name: string
    productId: number
    choices: Choices
    price: number
    imageUrl: string
    amount: number
  }
}
const cartInitialState = {
  items: [],
  subtotal: 0,
  points: 0,
}

export interface CartState {
  items?: {
    name: string
    productId: number
    choices: Choices
    price: number
    imageUrl: string
    amount: number
  }[]
  subtotal: number
  points: number
  addItems?: Function
}

export const CartContext = React.createContext<CartState>(cartInitialState)

const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case 'ADD_ITEMS': {
      const { data } = action
      const { productId } = data
      console.log(productId, state)

      return {
        ...state,
        subtotal: state.subtotal + data.price,
        items: [...state.items, data],
      }
    }

    default: {
      return state
    }
  }
}

export const CartProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(cartReducer, cartInitialState)
  const addItems = (
    data: {
      productId: number
      type: Choices
      price: number
    }[]
  ) => dispatch({ type: 'ADD_ITEMS', data })
  // const removeItem = (
  //   data: {
  //     productId: number
  //     type: string
  //   }[]
  // ) => dispatch({ type: 'REMOVE_ITEM', data })
  const value = useMemo(
    () => ({
      ...state,
      addItems,
    }),
    [state]
  )
  return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
  const context = React.useContext(CartContext)
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`)
  }
  return context
}
