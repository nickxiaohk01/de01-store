import React from 'react'
import { formatMoney } from 'accounting'
import { tabbable } from 'tabbable'
import { createCheckoutService } from '@bigcommerce/checkout-sdk'
import { Panel } from '@components/ui'
import { useCart } from '@context'
import { Shipping } from '@components/shipping'
import { SubmitButton } from '@components/submitButton'
import { LoadingState } from '@components/loadingState'
import { CartSummary } from '@components/cart'
import { Layout } from './Layout'
import s from './checkout.module.css'

type Props = {}
const Checkout = () => {
  const { items, subtotal } = useCart()

  if (!items) {
    return <Layout body={<LoadingState />} />
  }

  console.log('items', items)
  const SubmitOrder = () => {}
  const isPlacingOrder = () => {}
  return (
    <Layout
      body={
        <>
          <div className={s.body}>
            <Panel
              body={
                <form onSubmit={(event) => SubmitOrder(event)}>
                  <Shipping customer={{}} consignments={{}} cart={items} />
                  <div className={s.actionContainer}>
                    <SubmitButton
                      label={
                        isPlacingOrder()
                          ? 'Placing your order...'
                          : `Pay ${formatMoney(subtotal)}`
                      }
                      isLoading={isPlacingOrder()}
                    />
                  </div>
                </form>
              }
            />
          </div>
          <div className={s.side}>
            <CartSummary />
          </div>
        </>
      }
    />
  )
}

export default Checkout
