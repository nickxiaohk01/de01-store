import React from 'react'
import { find } from 'lodash.find'
import Consignment from './consignment'

class MultiShipping extends React.PureComponent {
  render() {
    return (
      <>
        {(this.props.cart.lineItems.physicalItems || []).map((item) => (
          <Consignment
            key={item.id}
            item={item}
            addresses={this.props.customer.addresses || []}
            isSelectingShippingOption={() =>
              this._isSelectingShippingOptions(item.id)
            }
            isUpdatingShippingAddress={() =>
              this._isUpdatingShippingAddress(item.id)
            }
            onConsignmentUpdate={this.props.onConsignmentUpdate}
            consignment={this._findConsignment(item.id) || {}}
          />
        ))}
      </>
    )
  }
}

export default MultiShipping
