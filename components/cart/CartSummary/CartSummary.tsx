import React, { FC } from 'react'
import dynamic from 'next/dynamic'
import { getProductByID } from '@mockAPI/getProduct'
import { PAYMENT_METHODS } from '@constants'
import { Points } from '@components/common'
import { useCart } from '@context'
import ItemLine from '../ItemLine'
import s from './CartSummary.module.css'
import { formatMoney } from 'accounting'

const CartSummary: FC = (props) => {
  const { items, subtotal, points } = JSON.parse(
    localStorage.getItem('demo-store') || ''
  )
  const { PAYMENT_CASH, PAYMENT_CASH_POINT, PAYMENT_POINT } = PAYMENT_METHODS
  const getExactPrice = (price: number, paymentType: string) => {
    switch (paymentType) {
      case PAYMENT_CASH: {
        return price
      }
      case PAYMENT_CASH_POINT: {
        return price - 10
      }
      case PAYMENT_POINT: {
        return 0
      }
      default: {
        return price
      }
    }
  }
  const getExactPoints = (price: number, paymentType: string) => {
    switch (paymentType) {
      case PAYMENT_CASH: {
        return undefined
      }
      case PAYMENT_CASH_POINT: {
        return 100
      }
      case PAYMENT_POINT: {
        return price * 10
      }
      default: {
        return undefined
      }
    }
  }
  return (
    <div className={s.container}>
      <div className={s.cartContainer}>
        <div className={s.cartHeaderContainer}>
          <div className={s.cartHeader}>Your Order</div>
        </div>
        {items &&
          items.map((item: any) => {
            const { name, productId, choices, price, imageUrl, amount } = item

            return (
              <ItemLine
                key={productId}
                label={`${amount} x ${name}`}
                price={`HK${formatMoney(
                  getExactPrice(price, choices && choices.paymentType)
                )}`}
                point={getExactPoints(price, choices && choices.paymentType)}
                imageUrl={imageUrl}
              />
            )
          })}
      </div>

      <div className={s.orderSummaryContainer}>
        <ItemLine label={'Subtotal'} price={`HK${formatMoney(subtotal)}`} />

        {points !== 0 ? (
          <ItemLine label={'01 Point'} price={<Points points={points} />} />
        ) : (
          ''
        )}

        <ItemLine label={'Shipping'} price={`HK${formatMoney(0)}`} />

        <ItemLine label={'Tax'} price={`HK${formatMoney(0)}`} />
        <div className={s.grandTotalContainer}>
          <div className={s.grandTotalLabel}>Total</div>

          <div className={s.grandTotalAmount}>
            {`HK${formatMoney(subtotal)}`}
            {points ? (
              <span>
                + <Points points={points} />
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(CartSummary), {
  ssr: false,
})
