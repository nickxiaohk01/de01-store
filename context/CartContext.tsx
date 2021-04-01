import React, { FC, useMemo } from 'react'
import useBigComCart from '@framework/cart/use-cart'
import { PAYMENT_METHODS, ACTION_TYPES } from '@constants'

const { ADD_ITEMS, READ_LOCALSTORAGE } = ACTION_TYPES
type Choices = {
  size: string
  color: string
  paymentType: string
}

type AddToCart = {
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

type ReadLocalStorage = {
  type: 'READ_LOCALSTORAGE'
}

const cartInitialState = {
  items: [],
  subtotal: 0,
  points: 0,
}

const cartInit = () => {
  const { data } = useBigComCart()
  const cartInitialState = {
    items: [],
    subtotal: data ? data.cart_amount : 0,
    points: 0,
  }
  return cartInitialState
}

export interface CartState {
  items: {
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
  readLocalStorage?: Function
}

export const CartContext = React.createContext<CartState>(cartInitialState)

const cartReducer = (
  state: CartState,
  action: AddToCart | ReadLocalStorage
) => {
  switch (action.type) {
    case 'ADD_ITEMS': {
      const { data } = action
      const { choices } = data
      let points = state.points
      let subtotal = state.subtotal
      const {
        PAYMENT_CASH,
        PAYMENT_CASH_POINT,
        PAYMENT_POINT,
      } = PAYMENT_METHODS
      if (choices.paymentType == PAYMENT_CASH_POINT) {
        subtotal = subtotal - 10 + data.price
        points = points + 100
      } else if (choices.paymentType == PAYMENT_POINT) {
        points = points + data.price * 10
      } else {
        subtotal = subtotal + data.price
      }

      const newState = {
        ...state,
        points,
        subtotal,
        items: [...state.items, data],
      }
      localStorage.setItem('demo-store', JSON.stringify(newState))
      return newState
    }

    case 'REMOVE_ITEM': {
      const { data } = action
      const { productId } = data
      const { items, subtotal, points } = state
      const removedItem = items.find((item) => item.productId === productId)
      const { choices } = removedItem
      const filterdItems = items.filter((item) => item.productId !== productId)
      let updateSubtotal = subtotal,
        updatePoints = points

      const {
        PAYMENT_CASH,
        PAYMENT_CASH_POINT,
        PAYMENT_POINT,
      } = PAYMENT_METHODS
      if (choices.paymentType == PAYMENT_CASH_POINT) {
        updateSubtotal = updateSubtotal + 10 - removedItem.price
        updatePoints = updatePoints - 100
      } else if (choices.paymentType == PAYMENT_POINT) {
        updatePoints = updatePoints - removedItem.price * 10
      } else {
        updateSubtotal = updateSubtotal - removedItem.price
      }

      return {
        ...state,
        subtotal: updateSubtotal,
        points: updatePoints,
        items: filterdItems,
      }
    }

    case 'READ_LOCALSTORAGE': {
      const newState = localStorage.getItem('demo-store')
      return JSON.parse(newState || '')
    }

    default: {
      return state
    }
  }
}

export const CartProvider: FC = (props) => {
  const cartInitData = cartInit()
  const [state, dispatch] = React.useReducer(cartReducer, cartInitData)
  const addItems = (data: {
    name: string
    productId: number
    choices: Choices
    price: number
    imageUrl: string
    amount: number
  }) => dispatch({ type: 'ADD_ITEMS', data })
  const removeItem = (data: { productId: string }) =>
    dispatch({ type: 'REMOVE_ITEM', data })
  const readLocalStorage = () => dispatch({ type: 'READ_LOCALSTORAGE' })
  const value = useMemo(
    () => ({
      ...state,
      addItems,
      readLocalStorage,
      removeItem,
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
