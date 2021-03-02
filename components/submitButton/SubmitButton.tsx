import React from 'react'
import s from './SubmitButton.module.css'

type Props = {
  label: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default class SubmitButton extends React.PureComponent<Props> {
  render() {
    return (
      <button type="submit" className={s.button} onClick={this.props.onClick}>
        {this.props.label}
      </button>
    )
  }
}
