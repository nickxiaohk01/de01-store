import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
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

type PaymentProps = {
  merchantAccountId: String
  paymentCompleteRedirectUrl: String
  callbackUrl: String
  mPayOption: Object
  paymentMethodWhitelist: Array<String>
  credit: Object
  stripeOption: Object
  merchantTranId: String
  point?: Object
}

const Checkout: React.FC<Props> = (props) => {
  const { items, subtotal, points } = JSON.parse(
    localStorage.getItem('demo-store') || ''
  )

  const { checkoutMethod } = props
  const [merchantTranId, setMerchantTranId] = useState(uuidv4())
  const [idempotencyKey, setIdempotencyKey] = useState(uuidv4())

  const mockPaymentData: PaymentProps = {
    merchantAccountId: 'wallet_test_merchant1',
    paymentCompleteRedirectUrl: 'https://de01-store.vercel.app/success',
    callbackUrl:
      'https://fake-partner-backend.com/api-to-receive-wallet-payment-result-callback',
    mPayOption: { deeplinkBackToApp: 'hk01uat://' },
    paymentMethodWhitelist: [],
    credit: { amount: subtotal * 100 },
    stripeOption: { isCapture: true },
    merchantTranId: merchantTranId,
  }
  if (points) {
    mockPaymentData['point'] = { amount: points, toUnionId: '1000800' }
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

export default dynamic(() => Promise.resolve(Checkout), {
  ssr: false,
})
