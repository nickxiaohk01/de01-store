import React, { FC } from 'react'
import s from './Points.module.css'
import { Points as PointsIcon } from '@components/icons'

export interface Props {
  points: number
}

const Points: FC<Props> = (props) => {
  const { points } = props

  return (
    <div>
      <PointsIcon
        style={{
          display: 'inline-block',
          verticalAlign: 'text-bottom',
          margin: '0 2px',
        }}
      />
      <span className={s.pointsText}>{formatNumber(points)}</span>
    </div>
  )
}

function formatNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default Points
