import React from 'react'
import { ThumbUp as ThumbUpIcon } from '@components/icons'
import s from './ThumbUp.module.css'

export interface Props {}

const ThumbUp: React.FC<Props> = (props) => {
  return (
    <div className={s.thumbUpContainer}>
      <ThumbUpIcon />
    </div>
  )
}

export default ThumbUp
