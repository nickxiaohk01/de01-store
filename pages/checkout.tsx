import React from 'react'
import { CartSummary } from '@components/cart'
import { fakePartnerServerProxy } from '@proxy'
import { Checkout as CheckoutComp } from '@components/checkout'

const Checkout = () => (
  <CheckoutComp checkoutMethod={fakePartnerServerProxy.submitPayment_V23} />
)

export default Checkout
