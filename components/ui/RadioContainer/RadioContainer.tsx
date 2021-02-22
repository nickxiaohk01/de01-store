import React from 'react'
import s from './RadioContainer.module.css'

class RadioContainer extends React.PureComponent {
  render() {
    return (
      <div className={s.container}>
        <div className={s.label}>{this.props.label}</div>
        {this.props.body}
      </div>
    )
  }
}

export default RadioContainer
