import React from 'react'
import s from './RadioInput.module.css'

type Props = {
  name: string
  value: string
  checked: boolean
  isLoading: boolean
  onChange: any
  label: string
}

class RadioInput extends React.PureComponent<Props> {
  render() {
    return (
      <label
        className={
          this.props.isLoading
            ? `${s.container} ${s.loadingState}`
            : s.container
        }
      >
        <input
          type="radio"
          name={this.props.name}
          value={this.props.value}
          checked={this.props.checked}
          disabled={this.props.isLoading}
          onChange={this.props.onChange}
          required
          className={s.input}
        />
        {this.props.label}
      </label>
    )
  }
}

export default RadioInput
