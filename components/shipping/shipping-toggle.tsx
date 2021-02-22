import React from 'react'
import { RadioContainer, RadioInput } from '@components/ui'

const SHIPPING_OPTIONS = [
  {
    id: 'single',
    multiShipping: false,
    label: 'Ship to single address',
  },
  {
    id: 'multi',
    multiShipping: true,
    label: 'Ship to multiple address',
  },
]

class ShippingToggle extends React.PureComponent {
  render() {
    return (
      <RadioContainer
        label={'Ship to more than one address?'}
        body={
          <>
            {SHIPPING_OPTIONS.map((option) => (
              <RadioInput
                key={option.id}
                name={'shoppingToggle'}
                value={option.id}
                checked={this.props.multiShipping == option.multiShipping}
                label={option.label}
                onChange={() => this._toggle(option.multiShipping)}
              />
            ))}
          </>
        }
      ></RadioContainer>
    )
  }

  _toggle(multiShipping) {
    this.props.onChange(multiShipping)
  }
}

export default ShippingToggle
