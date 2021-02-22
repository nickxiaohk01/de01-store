import React from 'react'

import s from './SubmitButton.module.css'

export default class SubmitButton extends React.PureComponent {
  render() {
    return (
      <button
        type="submit"
        disabled={this.props.isLoading}
        className={
          this.props.isLoading ? `${s.button} ${s.loadingState}` : s.button
        }
      >
        {this.props.label}
      </button>
    )
  }
}
