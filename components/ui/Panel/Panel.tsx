import React, { PureComponent } from 'react'
import s from './panel.module.css'

class Panel extends PureComponent {
  render() {
    return <div className={s.container}>{this.props.body}</div>
  }
}

export default Panel
