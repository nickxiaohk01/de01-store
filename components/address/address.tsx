import React, { Fragment, useState } from 'react'
import find from 'lodash.find'
import { Dropdown, TextInput } from '@components/ui'
import ProvinceInput from './ProvinceField'

type Props = {
  name: string
  onChange?: Function
}

const Address: React.FC<Props> = (props: Props) => {
  const { name } = props
  const [mockAddress, setMockAddress] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address1: '',
    address2: '',
    city: 'Hong Kong',
    countryCode: '',
    stateOrProvince: '',
    stateOrProvinceCode: '',
    postalCode: '',
  })
  const onChangeHandler = (field: string, value: string) => {
    setMockAddress({ ...mockAddress, [field]: value })
  }
  return (
    <Fragment>
      <TextInput
        id={`${name}FirstName`}
        label={'First Name'}
        value={mockAddress.firstName}
        onChange={({ target }: { target: HTMLInputElement }) =>
          onChangeHandler('firstName', target.value)
        }
        width={'half'}
      />

      <TextInput
        id={`${name}LastName`}
        label={'Last Name'}
        value={mockAddress.lastName}
        onChange={({ target }: { target: HTMLInputElement }) =>
          onChangeHandler('lastName', target.value)
        }
        width={'half'}
      />
      <TextInput
        id={`${name}Phone`}
        label={'Phone'}
        value={mockAddress.phone}
        onChange={({ target }: { target: HTMLInputElement }) =>
          onChangeHandler('phone', target.value)
        }
        optional={true}
        width={'full'}
      />

      <TextInput
        id={`${name}AddressLine1`}
        label={'Address Line 1'}
        value={mockAddress.address1}
        onChange={({ target }: { target: HTMLInputElement }) =>
          onChangeHandler('address1', target.value)
        }
        width={'full'}
      />

      <TextInput
        id={`${name}Apartment/Suite/Building`}
        label={'Apartment/Suite/Building'}
        value={mockAddress.address2}
        onChange={({ target }: { target: HTMLInputElement }) =>
          onChangeHandler('address2', target.value)
        }
        optional={true}
        width={'full'}
      />
      <TextInput
        id={`${name}City`}
        label={'Country/District'}
        value={mockAddress.city}
        onChange={({ target }: { target: HTMLInputElement }) =>
          onChangeHandler('city', target.value)
        }
        width={'full'}
      />
      {/* <Dropdown
          id={`${name}Country`}
          label={'Country'}
          value={mockAddress.countryCode}
          onChange={({ target }) =>
            onChangeHandler('countryCode', target.value)
          }
          options={this.props.countries}
          width={'full'}
        /> */}
      {/* <ProvinceInput
        name={name}
        stateOrProvince={mockAddress.stateOrProvince}
        stateOrProvinceCode={mockAddress.stateOrProvinceCode}
        onChange={({ target }: { target: HTMLInputElement }) =>
          onChangeHandler('stateOrProvince', target.value)
        }
        onCodeChange={({ target }) =>
          onChangeHandler('stateOrProvinceCode', target.value)
        }
      /> */}

      <TextInput
        id={`${name}PostalCode`}
        label={'Postal Code'}
        value={mockAddress.postalCode}
        onChange={({ target }: { target: HTMLInputElement }) =>
          onChangeHandler('postalCode', target.value)
        }
        width={'oneThird'}
      />
    </Fragment>
  )
}

export default Address
