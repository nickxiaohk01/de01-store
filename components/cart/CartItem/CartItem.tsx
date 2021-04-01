import { ChangeEvent, useEffect, useState, FC } from 'react'
import { formatMoney } from 'accounting'
import { useCart } from '@context'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { PAYMENT_METHODS } from '@constants'
import { Points } from '@components/common'
import { Trash, Plus, Minus } from '@components/icons'
import usePrice from '@framework/use-price'
import useUpdateItem from '@framework/cart/use-update-item'
import useRemoveItem from '@framework/cart/use-remove-item'
import s from './CartItem.module.css'
import removeItem from '../../../framework/bigcommerce/api/cart/handlers/remove-item'

type ItemOption = {
  name: string
  nameId: number
  value: string
  valueId: number
}

type Props = {
  item: {
    id: string
    name: string
    product_id: number
    amount: number
    choices: {
      paymentType: string
    }
    options: ItemOption[]
    image_url: string
  }
  currencyCode: string
}

const CartItem: FC<Props> = ({ item, currencyCode }) => {
  const { items, removeItem: removeItemFE } = useCart()
  const itemInCart =
    items &&
    items.find((curItem) => {
      return curItem.productId === item.product_id
    })
  const updateItem = useUpdateItem(item)
  const removeItem = useRemoveItem()
  const [quantity, setQuantity] = useState(item.amount)
  const [removing, setRemoving] = useState(false)
  const { PAYMENT_CASH, PAYMENT_CASH_POINT, PAYMENT_POINT } = PAYMENT_METHODS
  const { paymentType } = itemInCart
    ? itemInCart.choices
    : { paymentType: PAYMENT_CASH }

  let points = 0
  let priceCharged = itemInCart ? itemInCart.price : 0

  if (paymentType === PAYMENT_CASH_POINT) {
    priceCharged -= 10
    points = 100
  }
  if (paymentType === PAYMENT_POINT && itemInCart) {
    priceCharged = 0
    points = itemInCart.price * 10
  }

  const updateQuantity = async (val: number) => {
    await updateItem({ quantity: val })
  }
  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
    }
  }
  const handleBlur = () => {
    const val = Number(quantity)

    if (val !== item.amount) {
      updateQuantity(val)
    }
  }
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      updateQuantity(val)
    }
  }
  const handleRemove = async () => {
    setRemoving(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem({ id: item.id })
      removeItemFE({ productId: item.product_id })
    } catch (error) {
      setRemoving(false)
    }
  }

  useEffect(() => {
    // Reset the quantity state if the item.amount changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(Number(item.quantity))
    }
  }, [item.amount])

  return (
    <li
      className={cn('flex flex-row space-x-8 py-8', {
        'opacity-75 pointer-events-none': removing,
      })}
    >
      <div className="w-16 h-16 bg-violet relative overflow-hidden">
        <Image
          className={s.productImage}
          src={item.image_url}
          width={150}
          height={150}
          alt="Product Image"
          // The cart item image is already optimized and very small in size
          unoptimized
        />
      </div>
      <div className="flex-1 flex flex-col text-base">
        {/** TODO: Replace this. No `path` found at Cart */}
        <span className="font-bold text-lg cursor-pointer leading-6">
          {item.name}
        </span>
        {item.options && item.options.length > 0 ? (
          <div className="">
            {item.options.map((option: ItemOption, i: number) => (
              <span
                key={`${item.id}-${option.name}`}
                className="text-sm font-semibold text-accents-7"
              >
                {option.value}
                {i === item.options.length - 1 ? '' : ', '}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex items-center mt-3">
          <button type="button" onClick={() => increaseQuantity(-1)}>
            <Minus width={18} height={18} />
          </button>
          <label>
            <input
              type="number"
              max={99}
              min={0}
              className={s.quantity}
              value={quantity}
              onChange={handleQuantity}
              onBlur={handleBlur}
            />
          </label>
          <button type="button" onClick={() => increaseQuantity(1)}>
            <Plus width={18} height={18} />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-2 text-base">
        <span>
          {formatMoney(priceCharged)}
          {paymentType !== PAYMENT_CASH && (
            <span>
              {' '}
              + <Points points={points} />
            </span>
          )}
        </span>
        <button className="flex justify-end" onClick={handleRemove}>
          <Trash />
        </button>
      </div>
    </li>
  )
}

export default CartItem
