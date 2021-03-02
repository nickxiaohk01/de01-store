import React from 'react'
import classNames from 'classnames'
import s from './InputContainer.module.css'

type Props = {
  id: string
  label: string
  width: string
  inline?: string
  helpText?: string
  body: JSX.Element
}

export default class InputContainer extends React.PureComponent<Props> {
  render() {
    return (
      <div
        className={classNames(
          s.container,
          s[this.props.width ? this.props.width + 'Width' : 'fullWidth']
        )}
      >
        <label htmlFor={this.props.id} className={s.label}>
          {this.props.label}{' '}
          {this.props.helpText && (
            <span className={s.helpText}>({this.props.helpText})</span>
          )}
        </label>

        {this.props.body}
      </div>
    )
  }
}
