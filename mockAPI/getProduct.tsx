// @ts-nocheck
import data from './data.json'
import type { ProductNode } from '@framework/api/operations/get-product'
export const getProduct = async ({ slug }: { slug: string }) => {
  const { allProducts } = data
  const { products } = allProducts
  const targetProduct = products.find((product) => product.path.includes(slug))
  const targetProductData = {
    product: targetProduct,
  }
  return Promise.resolve(targetProductData)
}

type Res = {
  product: ProductNode
}

export const getProductByID = async ({
  productID,
}: {
  productID: number
}): Promise<Res> => {
  const { allProducts } = data
  const { products } = allProducts
  const targetProduct: ProductNode = products.find(
    (product) => product.entityId === productID
  )
  const targetProductData = {
    product: targetProduct,
  }
  return Promise.resolve(targetProductData)
}
