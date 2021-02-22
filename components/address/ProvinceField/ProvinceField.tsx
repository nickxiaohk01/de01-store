import React, { Fragment } from 'react'
import { isEmpty } from 'lodash.isempty'
import { Dropdown, TextInput } from '@components/ui'

export default class ProvinceInput extends React.PureComponent {
  render() {
    return (
      <Fragment>
        {this.props.country && !isEmpty(this.props.country.subdivisions) ? (
          <Dropdown
            id={`${this.props.name}State`}
            label={'State'}
            value={this.props.stateOrProvinceCode}
            onChange={this.props.onCodeChange}
            options={this.props.country.subdivisions}
            width={'half'}
          />
        ) : (
          <TextInput
            id={`${this.props.name}State`}
            label={'State'}
            value={this.props.stateOrProvince}
            onChange={this.props.onChange}
            width={'half'}
          />
        )}
      </Fragment>
    )
  }
}
