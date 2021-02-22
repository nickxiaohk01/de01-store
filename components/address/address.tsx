import React, { Fragment } from 'react'
import { find } from 'lodash.find'
import { Dropdown, TextInput } from '@components/ui'
import ProvinceInput from './ProvinceField'

export default class Address extends React.PureComponent {
  render() {
    const mockAddress = {
      firstname: '',
      lastName: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      countryCode: '',
      stateOrProvince: '',
      stateOrProvinceCode: '',
      postalCode: '',
    }
    return (
      <Fragment>
        <TextInput
          id={`${this.props.name}FirstName`}
          label={'First Name'}
          value={mockAddress.firstName}
          onChange={({ target }) =>
            this.props.onChange('firstName', target.value)
          }
          width={'half'}
        />

        <TextInput
          id={`${this.props.name}LastName`}
          label={'Last Name'}
          value={mockAddress.lastName}
          onChange={({ target }) =>
            this.props.onChange('lastName', target.value)
          }
          width={'half'}
        />
        <TextInput
          id={`${this.props.name}Phone`}
          label={'Phone'}
          value={mockAddress.phone}
          onChange={({ target }) => this.props.onChange('phone', target.value)}
          optional={true}
          width={'full'}
        />

        <TextInput
          id={`${this.props.name}AddressLine1`}
          label={'Address Line 1'}
          value={mockAddress.address1}
          onChange={({ target }) =>
            this.props.onChange('address1', target.value)
          }
          width={'full'}
        />

        <TextInput
          id={`${this.props.name}Apartment/Suite/Building`}
          label={'Apartment/Suite/Building'}
          value={mockAddress.address2}
          onChange={({ target }) =>
            this.props.onChange('address2', target.value)
          }
          optional={true}
          width={'full'}
        />
        <TextInput
          id={`${this.props.name}City`}
          label={'City'}
          value={mockAddress.city}
          onChange={({ target }) => this.props.onChange('city', target.value)}
          width={'full'}
        />
        {/* <Dropdown
          id={`${this.props.name}Country`}
          label={'Country'}
          value={mockAddress.countryCode}
          onChange={({ target }) =>
            this.props.onChange('countryCode', target.value)
          }
          options={this.props.countries}
          width={'full'}
        /> */}
        <ProvinceInput
          name={this.props.name}
          stateOrProvince={mockAddress.stateOrProvince}
          stateOrProvinceCode={mockAddress.stateOrProvinceCode}
          onChange={({ target }) =>
            this.props.onChange('stateOrProvince', target.value)
          }
          onCodeChange={({ target }) =>
            this.props.onChange('stateOrProvinceCode', target.value)
          }
        />

        <TextInput
          id={`${this.props.name}PostalCode`}
          label={'Postal Code'}
          value={mockAddress.postalCode}
          onChange={({ target }) =>
            this.props.onChange('postalCode', target.value)
          }
          width={'oneThird'}
        />
      </Fragment>
    )
  }
}
