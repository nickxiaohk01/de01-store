import dynamic from 'next/dynamic'
import { FC } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import useCart from '@framework/cart/use-cart'
import useCustomer from '@framework/use-customer'
import { Heart, Bag } from '@components/icons'
import { useUI } from '@context'
import DropdownMenu from './DropdownMenu'
import s from './UserNav.module.css'
import { Avatar } from '@components/common'

interface Props {
  className?: string
}
const countItem = (count: number, item: any) => count + item.quantity
const countItems = (count: number, items: any[]) =>
  items.reduce(countItem, count)

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const { data } = useCart()
  const { data: customer } = useCustomer()
  const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI()
  const itemsCount = Object.values(data?.line_items ?? {}).reduce(countItems, 0)
  const cachedItems = localStorage.getItem('demo-store')
  let cartItems = {
    items: [],
  }
  if (cachedItems) {
    cartItems = JSON.parse(cachedItems)
  }
  const cartItemsCount = cartItems ? cartItems.items.length : 0
  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <li className={s.item} onClick={toggleSidebar}>
            <Bag />
            {cartItemsCount > 0 && (
              <span className={s.bagCount}>{cartItemsCount}</span>
            )}
          </li>
          <li className={s.item}>
            <Link href="/wishlist">
              <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                <Heart />
              </a>
            </Link>
          </li>
          <li className={s.item}>
            {customer ? (
              <DropdownMenu />
            ) : (
              <button
                className={s.avatarButton}
                aria-label="Menu"
                onClick={() => openModal()}
              >
                <Avatar />
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default dynamic(() => Promise.resolve(UserNav), {
  ssr: false,
})
