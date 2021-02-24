import Reac, { useState } from 'react'
import { formatMoney } from 'accounting'
import { tabbable } from 'tabbable'
import { createCheckoutService } from '@bigcommerce/checkout-sdk'
import { Panel } from '@components/ui'
import { useCart } from '@context'
import { v4 as uuidv4 } from 'uuid'
import * as R from 'ramda'
import { Shipping } from '@components/shipping'
import { SubmitButton } from '@components/submitButton'
import { LoadingState } from '@components/loadingState'
import { CartSummary } from '@components/cart'
import { Layout } from './Layout'
import s from './checkout.module.css'

export const isNotNil = R.pipe(R.isNil, R.not)

export const filterNotNil = R.filter(isNotNil)
type Props = {
  checkoutMethod: Function
}
const Checkout: React.FC<Props> = (props) => {
  const { items, subtotal } = useCart()
  const { checkoutMethod } = props
  const [merchantTranId, setMerchantTranId] = useState(uuidv4())
  const [idempotencyKey, setIdempotencyKey] = useState(uuidv4())
  const mockPaymentData = {
    merchantAccountId: 'wallet_test_merchant1',
    paymentCompleteRedirectUrl: 'http://localhost:8080/fake/2.3/pay',
    callbackUrl:
      'https://fake-partner-backend.com/api-to-receive-wallet-payment-result-callback',
    mPayOption: { deeplinkBackToApp: 'hk01uat://' },
    paymentMethodWhitelist: [],
    credit: { amount: subtotal * 100 },
    stripeOption: { isCapture: true },
    merchantTranId: '8ee13067-820a-4dfe-87bb-8fbcb022f1e0',
  }

  if (!items) {
    return <Layout body={<LoadingState />} />
  }
  const SubmitOrder = async (data) => {
    try {
      return await checkoutMethod(data)
    } catch (e) {
      console.log(e)
    }
  }

  const SubmitHandler = async (e) => {
    e.preventDefault()
    const response = await SubmitOrder({
      data: filterNotNil(mockPaymentData),
      partnerId: '2',
      idempotencyKey,
    })
    window.location.assign(response.data.paymentEntryUrl)
  }
  const isPlacingOrder = () => {}
  return (
    <Layout
      body={
        <>
          <div className={s.body}>
            <Panel
              body={
                <form onSubmit={(event) => SubmitHandler(event)}>
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
