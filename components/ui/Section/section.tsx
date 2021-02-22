import React from 'react'
import s from './section.module.css'

class Section extends React.PureComponent {
  render() {
    return (
      <div className={s.section}>
        <div className={s.header}>{this.props.header}</div>
        <div className={s.subHeader}>{this.props.subHeader}</div>
        <div className={s.body}>{this.props.body}</div>
      </div>
    )
  }
}

export default Section
