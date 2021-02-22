import React from 'react'
import s from './ItemLine.module.css'

export default class ItemLine extends React.PureComponent {
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

        <div className={s.amount}>{this.props.amount}</div>
      </div>
    )
  }
}
