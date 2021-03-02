import React, { Fragment } from 'react'
import isEmpty from 'lodash.isempty'
import { Dropdown, TextInput } from '@components/ui'

type Props = {
  name: string
  stateOrProvince: string
  onChange: Function
}

export default class ProvinceInput extends React.PureComponent<Props> {
  render() {
    return (
      <Fragment>
        <TextInput
          id={`${this.props.name}State`}
          label={'State'}
          value={this.props.stateOrProvince}
          onChange={this.props.onChange}
          width={'half'}
        />
      </Fragment>
    )
  }
}
