import React, { useState, useEffect } from 'react'
import { SubmitButton } from '@components/submitButton'
import { formatMoney } from 'accounting'
import { Panel } from '@components/ui'
import { useCart as useCartFE } from '@context'
import { CartSummary } from '@components/cart'
import { Layout } from '@components/ui'
import { ThumbUp } from '@components/common'
import useRemoveItem from '@framework/cart/use-remove-item'
import LineItem from './LineItem'
import s from './success.module.css'

type Props = {}

const Success: React.FC<Props> = (props) => {
  const { readLocalStorage } = useCartFE()
  const removeItem = useRemoveItem()
  const removeItemByForce = async (id: string) => {
    try {
      await removeItem({ id })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    readLocalStorage && readLocalStorage()
  }, [])

  return (
    <Layout
      body={
        <>
          <div className={s.body}>
            <Panel
              body={
                <div className={s.actionContainer}>
                  <div className={s.successContainer}>
                    <ThumbUp />
                    <div className={s.successTitle}>Thank you Kenneth!</div>
                  </div>
                  <div className={s.successSubTitle}>
                    Your order is confirmed, you’ll receive an email and text
                    when your order is ready.
                  </div>
                  <div className={s.successContent}>
                    <LineItem label="Cusomer" content="NickXiao@hk01.com" />
                    <LineItem
                      label="Shipping"
                      content="Nick
                            11th Floor, The Octagon, 6 Sha Tsui  Road, Tsuen Wan West, Tsuen Wan
                            Hong Kong
                            Hong Kong
                            New Territories Hong Kong SAR China
                            0000 0000"
                    />
                    <LineItem label="Payment" content="01 Wallet" />
                  </div>
                  <SubmitButton
                    label="Continue Shopping"
                    onClick={() => {
                      localStorage.removeItem('demo-store')

                      window.location.replace('/')
                    }}
                  />
                </div>
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

export default Success
