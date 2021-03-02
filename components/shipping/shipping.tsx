import React from 'react'
import find from 'lodash.find'
import { Section } from '@components/ui'
import SingleShipping from './single-shipping'

type Props = {}

class Shipping extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
    this.state = {
      multiShipping: false,
    }
  }

  render() {
    return (
      <Section
        header={'Shipping'}
        subHeader={'Shipping Address'}
        body={
          <>
            <SingleShipping />
          </>
        }
      />
    )
  }
}
export default Shipping
