import React, {
  LabelHTMLAttributes,
  forwardRef,
  useRef,
  useCallback,
} from 'react'
import cn from 'classnames'
import s from './Radio.module.css'

export interface RadioProps extends LabelHTMLAttributes<HTMLLabelElement> {
  selected: boolean
  className?: string
}

const Radio: React.FC<RadioProps> = (props, radioRef) => {
  const { className, children, selected, onClick } = props
  const rootClassName = cn(s.radioWrapper, className)
  const radioClassName = cn({
    [s.radioSelected]: selected,
  })
  return (
    <div className={rootClassName}>
      <input type="radio" />
      <label className={radioClassName} onClick={onClick}>
        {children}
      </label>
    </div>
  )
}

export default Radio
