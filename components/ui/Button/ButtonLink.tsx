import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import s from './Button.module.css'

type Props = { children: string; href: string; width: string }
const ButtonLink = (props: Props) => {
  const rootClassName = cn(s.root, s.slim, s.fullWidth)
  return (
    <div className={rootClassName}>
      <Link {...props} />
    </div>
  )
}

export default ButtonLink
