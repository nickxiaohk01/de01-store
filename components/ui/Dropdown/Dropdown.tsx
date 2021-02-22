import React from 'react'
import { InputContainer } from '@components/ui'
import s from './Dropdown.module.css'

export default class Dropdown extends React.PureComponent {
  render() {
    return (
      <InputContainer
        id={this.props.id}
        inline={this.props.inline}
        label={this.props.label}
        width={this.props.width}
        body={
          <select
            id={this.props.id}
            value={this.props.value || ''}
            onChange={this.props.onChange}
            className={s.select}
          >
            <option value="" />
            {this.props.options.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>
        }
      />
    )
  }
}
