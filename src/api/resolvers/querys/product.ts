import ProductRepository from '../../datasources/ProductRepository'

const productQuery = {
  getProducts: (_: any, args: any) => {
    const products = new ProductRepository()
    return products.getProducts()
  },
  getProduct: (_: any, args: any) => {
    const { _id }: any = args
    const product = new ProductRepository()
    return product.getProduct(_id)
  }
}

export default productQuery
