require('dotenv').config({ path: 'variables.env' })

import Producto from '../models/Producto'

import mongoose from 'mongoose'

class ProductRepository {
  async createNewProduct (product: any): Promise<any> {
    try {
      const newProduct = new Producto(product)
      const productDB = await newProduct.save()

      return productDB
    } catch (error) {
      throw new Error('Error al crear el producto')
    }
  }
  async getProducts (): Promise<any> {
    try {
      const products = await Producto.find({})
      return products
    } catch (error) {
      throw new Error('Error al obtener los productos')
    }
  }

  async getProduct (_id: string): Promise<any> {
    try {
      const product = await Producto.findById(_id)

      if (product !== null) {
        return product
      } else {
        throw new Error(`El producto ${_id} no existe`)
      }
    } catch (error) {
      if (error instanceof mongoose.Error && error.name.includes('Mongo')) {
        // Manejar el error de conexión
        throw new Error(
          `Error de conexión a la base de datos: ${error.message}`
        )
      } else {
        // Otro tipo de error, lanzar mensaje genérico
        throw new Error(`El producto ${_id} no existe`)
      }
    }
  }

  async updateProduct (_id: string, input: any): Promise<any> {
    try {
      let product = await Producto.findById(_id)

      if (!product) {
        throw new Error(`El producto ${_id} no existe`)
      }

      // Este metodo retorna el producto actualizado si le pones new: true
      //de lo contrario retorna el producto antes de actualizar
      const productUpdated = await Producto.findOneAndUpdate(
        { _id: _id },
        input,
        { new: true }
      )

      return productUpdated
    } catch (error) {}
  }

  async deleteProduct (_id: string): Promise<any> {
    try {
      let product = await Producto.findById(_id)

      if (!product) {
        throw new Error(`El producto ${_id} no existe`)
      }

      const productDeleted = await Producto.findOneAndDelete({ _id: _id })

      return productDeleted
    } catch (error) {}
  }
  async updateProductStock (productId: any, newCount: any): Promise<any> {
    const product = await Producto.findById(productId)
    if (!product) {
      throw new Error('Product not found')
    }
    product.count = newCount
    await product.save()
    return product
  }
}

export default ProductRepository
