import React, { FC } from 'react'
import { getProductByID } from '@mockAPI/getProduct'
import { useCart } from '@context'
import ItemLine from '../ItemLine'
import s from './CartSummary.module.css'
import { formatMoney } from 'accounting'

const CartSummary: FC = (props) => {
  const { items, subtotal } = useCart()

  return (
    <div className={s.container}>
      <div className={s.cartContainer}>
        <div className={s.cartHeaderContainer}>
          <div className={s.cartHeader}>Your Order</div>
        </div>
        {items.map((item) => {
          const { name, productId, type, price, imageUrl, amount } = item
          return (
            <ItemLine
              key={productId}
              label={`${amount} x ${name}`}
              amount={formatMoney(price)}
              imageUrl={imageUrl}
            />
          )
        })}
      </div>

      <div className={s.orderSummaryContainer}>
        <ItemLine label={'Subtotal'} amount={formatMoney(subtotal)} />

        <ItemLine label={'Shipping'} amount={formatMoney(0)} />

        <div className={s.grandTotalContainer}>
          <div className={s.grandTotalLabel}>Total</div>

          <div className={s.grandTotalAmount}>{formatMoney(subtotal)}</div>
        </div>
      </div>
    </div>
  )
}

export default CartSummary
