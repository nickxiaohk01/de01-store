import React from 'react'
import s from './RadioContainer.module.css'

type Props = {
  label: string
  body: JSX.Element
}

class RadioContainer extends React.PureComponent<Props> {
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
