import data from './data.json'
export const getProduct = async ({ slug }) => {
  const { allProducts } = data
  const { products } = allProducts
  const targetProduct = products.find((product) => product.path.includes(slug))
  const targetProductData = {
    product: targetProduct,
  }
  return Promise.resolve(targetProductData)
}

export const getProductByID = async ({ productID }) => {
  const { allProducts } = data
  const { products } = allProducts
  const targetProduct = products.find(
    (product) => product.entityId === productID
  )
  const targetProductData = {
    product: targetProduct,
  }

  return Promise.resolve(targetProductData)
}
