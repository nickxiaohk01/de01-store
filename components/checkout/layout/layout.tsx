import React, { FC } from 'react'
import Link from 'next/link'
import s from './layout.module.css'

type Props = {
  body: JSX.Element
}

const Layout: FC<Props> = (props) => {
  return (
    <main className={s.main}>
      <div className={s.header}>
        <div className={s.title}>
          <Link href="/">HK01</Link>
        </div>
      </div>
      <div className={s.container}>{props.body}</div>
    </main>
  )
}

export default Layout
