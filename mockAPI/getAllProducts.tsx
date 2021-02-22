import data from './data.json'
export const getAllProductsMock = async ({ type }) => {
  const { featuredProducts, bestSellingProducts, newestProducts } = data
  switch (type) {
    case 'featuredProducts': {
      return Promise.resolve(featuredProducts)
    }
    case 'bestSellingProducts': {
      return Promise.resolve(bestSellingProducts)
    }
    case 'newestProducts': {
      return Promise.resolve(newestProducts)
    }
    default: {
      return Promise.resolve(featuredProducts)
    }
  }
}
