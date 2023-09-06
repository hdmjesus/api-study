import ProductRepository from '../../datasources/ProductRepository'

const productMutations = {
  newProduct: async (_: any, data: any) => {
    const { input }: any = data

    const product = new ProductRepository()
    const newProduct = await product.createNewProduct(input)
    return newProduct
  },
  updateProduct: (_: any, args: any) => {
    const { _id, input }: any = args
    const product = new ProductRepository()
    return product.updateProduct(_id, input)
  },
  deleteProduct: (_: any, args: any) => {
    const { _id }: any = args
    const product = new ProductRepository()
    return product.deleteProduct(_id)
  }
}

export default productMutations
