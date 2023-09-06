require('dotenv').config({ path: 'variables.env' })
import Order from '../models/Order'
import Producto from '../models/Producto'
import Client from '../models/Client'
import ProductRepository from './ProductRepository'

class OrderRepository {
  async checkProductStock (orderItems: any) {
    const productPassed = []

    for await (const product of orderItems) {
      const { id, count } = product
      const hasProduct = await Producto.findById(id)

      if (!hasProduct || count > hasProduct.count) {
        throw new Error(`Insufficient stock for product: ${hasProduct?.name}`)
      }
      productPassed.push(product)
    }

    return productPassed
  }
  async createOrder (input: any, user: any) {
    //verificar si el cliente existe o no

    const { client } = input

    const hasClient = await Client.findById(client)

    if (!hasClient) {
      throw new Error('Client not found')
    }
    //verifica si el cliente es del vendedor
    if (hasClient.seller.toString() !== user.id) {
      throw new Error('You are not allowed to see this client')
    }

    //revisar que el stock este disponible

    //for await es un operador asincrono que espera
    for await (const product of input.order) {
      const { id } = product

      const hasProduct = await Producto.findById(id)

      if (product.count > hasProduct?.count!) {
        throw new Error(
          `The product: ${hasProduct?.name} exceeds the available quantity`
        )
      }

      const newCountProduct = hasProduct!.count - product?.count!
      const productUpdate = new ProductRepository()

      await productUpdate.updateProductStock(id, newCountProduct)
      //restar la cantidad a lo disponible
      // hasProduct!.count -= product.count
      await hasProduct?.save()

      const newOrder = await new Order(input)
      //asignarle un vendedor
      newOrder.seller = user.id
      // await hasProduct.save()
      const saveOrder = await newOrder.save()
      return saveOrder
    }
  }
}

export default OrderRepository
