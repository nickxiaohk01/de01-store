import React, { FC } from 'react'
import { Points as PointsIcon } from '@components/icons'
import s from './Points.module.css'

export interface Props {
  points: number
}

const Points: FC<Props> = (props) => {
  const { points } = props

  return (
    <div className={s.pointContainer}>
      <PointsIcon className={s.pointIcon} />
      <span className={s.pointsText}>{formatNumber(points)}</span>
    </div>
  )
}

function formatNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default Points
