import React, { FC, useState, useCallback } from 'react'
import cn from 'classnames'
import s from './PaymentList.module.css'
import { Radio } from '@components/ui'
import { Points } from '@components/common'
import { NumberFieldOption } from '../../../framework/bigcommerce/schema'

export interface Props {
  price: number
  priceWithPoints?: number
  fullInPoints?: number
  onSelected: Function
  defaultOption: string
}

type ChoiceProps = {
  size: string
  color: string
  paymentType: string
}

const PaymentList: FC<Props> = (props) => {
  const {
    price,
    priceWithPoints,
    fullInPoints,
    onSelected,
    defaultOption,
  } = props
  const PAYMENT_CASH = 'PAYMENT_CASH'
  const PAYMENT_CASH_POINT = 'PAYMENT_CASH_POINT'
  const PAYMENT_POINT = 'PAYMENT_POINT'
  const [option, setOption] = useState(defaultOption)

  const onSelectedHandler = useCallback(
    (paymentType) => () => {
      setOption(paymentType)
      onSelected(
        (choies: ChoiceProps): ChoiceProps => {
          return {
            ...choies,
            paymentType,
          }
        }
      )
    },
    [option]
  )

  return (
    <div className={s.paymentContainer}>
      <div className={s.paymentLabel}>PAYMENT</div>
      <div className={s.paymentOptContainer}>
        <Radio
          className={s.paymentOption}
          selected={option === PAYMENT_CASH}
          onClick={onSelectedHandler(PAYMENT_CASH)}
        >{`$${price.toFixed(2)}`}</Radio>
        {priceWithPoints && (
          <Radio
            className={s.paymentOption}
            selected={option === PAYMENT_CASH_POINT}
            onClick={onSelectedHandler(PAYMENT_CASH_POINT)}
          >
            {`$${priceWithPoints.toFixed(1)} + `}
            <Points points={(price - priceWithPoints) * 10} />
          </Radio>
        )}
        {priceWithPoints && fullInPoints && (
          <Radio
            className={s.paymentOption}
            selected={option === PAYMENT_POINT}
            onClick={onSelectedHandler(PAYMENT_POINT)}
          >
            <Points points={fullInPoints} />
          </Radio>
        )}
      </div>
    </div>
  )
}

export default PaymentList
