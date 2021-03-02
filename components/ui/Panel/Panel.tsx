import React from 'react'
import s from './Panel.module.css'

type Props = {
  body: JSX.Element
}

class Panel extends React.PureComponent<Props> {
  render() {
    return <div className={s.container}>{this.props.body}</div>
  }
}

export default Panel
