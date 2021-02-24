import React from 'react'
import { debounce } from 'lodash.debounce'
import { Address } from '@components/address'

class SingleShipping extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      address: {},
    }
  }

  componentDidMount() {
    console.log('SingleShipping Component Did Mount')
    // this.props.onAddressChange(this.props.address)
    // this.setState({ address: this.props.address || {} })
  }

  render() {
    return (
      <>
        <Address name={'Shipping'} />
      </>
    )
  }
}

export default SingleShipping
