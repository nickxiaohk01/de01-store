import React from 'react'
import s from './loadingState.module.css'

class LoadingState extends React.PureComponent {
  render() {
    return <div className={s.container}>Loading...</div>
  }
}

export default LoadingState
