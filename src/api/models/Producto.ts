import mongoose from 'mongoose'

const ProductoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  count: { type: Number, required: true },
  price: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
})

const Producto = mongoose.model('Producto', ProductoSchema)

export default Producto
