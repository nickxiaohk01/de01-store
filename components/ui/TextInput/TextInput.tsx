import React from 'react'
import { InputContainer } from '@components/ui'
import s from './TextInput.module.css'
import { SiteBrandsArgs } from '../../../framework/bigcommerce/schema'

type Props = {
  id: string
  label: string
  value: string
  onChange: any
  width: string
  placeholder?: string
  optional?: boolean
}

export default class TextInput extends React.PureComponent<Props> {
  render() {
    return (
      <InputContainer
        id={this.props.id}
        label={this.props.label}
        helpText={this.props.optional ? 'Optional' : ''}
        width={this.props.width}
        body={
          <input
            type="text"
            id={this.props.id}
            value={this.props.value || ''}
            required={!this.props.optional}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
            className={s.input}
          />
        }
      />
    )
  }
}
