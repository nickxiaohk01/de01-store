import React from 'react'
import debounce from 'lodash.debounce'
import { Address } from '@components/address'

type Props = {}
class SingleShipping extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)

    this.state = {
      address: {},
    }
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
