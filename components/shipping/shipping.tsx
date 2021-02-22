import React from 'react'
import { find } from 'lodash.find'
import { Section } from '@components/ui'
import SingleShipping from './single-shipping'
import ShippingToggle from './shipping-toggle'
import MultiShipping from './multi-shipping'

class Shipping extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      multiShipping: (this.props.consignments || []).length > 1,
    }
  }

  render() {
    return (
      <Section
        header={'Shipping'}
        subHeader={'Shipping Address'}
        body={
          <>
            {this._hasSavedAddress && this._hasMultiplePhysicalItems() && (
              <ShippingToggle
                onChange={(value) => this._toggleMultiShipping(value)}
                multiShipping={this.state.multiShipping}
              />
            )}
            <SingleShipping />
          </>
        }
      ></Section>
    )
  }
}

export default Shipping
