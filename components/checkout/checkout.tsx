import React, { useState } from 'react'
import { formatMoney } from 'accounting'
import { Panel } from '@components/ui'
import { useCart } from '@context'
import { v4 as uuidv4 } from 'uuid'
import * as R from 'ramda'
import { Shipping } from '@components/shipping'
import { SubmitButton } from '@components/submitButton'
import { LoadingState } from '@components/loadingState'
import { CartSummary } from '@components/cart'
import { Layout } from '@components/ui'
import s from './checkout.module.css'

export const isNotNil = R.pipe(R.isNil, R.not)

export const filterNotNil = R.filter(isNotNil)
type Props = {
  checkoutMethod: Function
}
const Checkout: React.FC<Props> = (props) => {
  const { items, subtotal, points } = useCart()
  const { checkoutMethod } = props
  const [merchantTranId, setMerchantTranId] = useState(uuidv4())
  const [idempotencyKey, setIdempotencyKey] = useState(uuidv4())

  const mockPaymentData = {
    merchantAccountId: 'wallet_test_merchant1',
    paymentCompleteRedirectUrl: 'https://de01-store.vercel.app/success',
    callbackUrl:
      'https://fake-partner-backend.com/api-to-receive-wallet-payment-result-callback',
    mPayOption: { deeplinkBackToApp: 'hk01uat://' },
    paymentMethodWhitelist: [],
    credit: { amount: subtotal * 100 },
    stripeOption: { isCapture: true },
    merchantTranId: '8ee13067-820a-4dfe-87bb-8fbcb022f1e0',
    point: { amount: points, toUnionId: '1000800' },
  }

  if (!items) {
    return <Layout body={<LoadingState />} />
  }
  const SubmitOrder = async (data: any) => {
    try {
      return await checkoutMethod(data)
    } catch (e) {
      console.log(e)
    }
  }

  const SubmitHandler = async (e: React.FormEvent<any>) => {
    e.preventDefault()
    const response = await SubmitOrder({
      data: filterNotNil(mockPaymentData),
      partnerId: '2',
      idempotencyKey,
    })
    window.location.assign(response.data.paymentEntryUrl)
  }
  return (
    <Layout
      body={
        <>
          <div className={s.body}>
            <Panel
              body={
                <form onSubmit={(event) => SubmitHandler(event)}>
                  <Shipping />
                  <div className={s.actionContainer}>
                    <SubmitButton label={`Pay Now`} />
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
