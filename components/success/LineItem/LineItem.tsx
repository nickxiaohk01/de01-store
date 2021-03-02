import React from 'react'
import s from './LineItem.module.css'

export type Props = {
  label: string
  content: string
}

const LineItem: React.FC<Props> = (props) => {
  const { label, content } = props
  return (
    <div className={s.lineItemContainer}>
      <div className={s.lineItemLabel}>{label}:</div>
      <div className={s.lineItemContent}>{content}</div>
    </div>
  )
}

export default LineItem
