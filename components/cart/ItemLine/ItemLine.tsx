import React from 'react'
import { Points } from '@components/common'
import s from './ItemLine.module.css'

type Props = {
  label: string
  price: string | JSX.Element
  point?: number
  imageUrl?: string
}
export default class ItemLine extends React.PureComponent<Props> {
  render() {
    return (
      <div className={s.container}>
        <div className={s.labelContainer}>
          {this.props.imageUrl && (
            <img src={this.props.imageUrl} className={s.image} />
          )}

          <div className={s.label}>
            <div> {this.props.label} </div>
          </div>
        </div>
        <div className={s.priceContainer}>
          <div className={s.amount}>{this.props.price}</div>
          {this.props.point && (
            <div className={s.amount}>
              <Points points={this.props.point} />
            </div>
          )}
        </div>
      </div>
    )
  }
}
