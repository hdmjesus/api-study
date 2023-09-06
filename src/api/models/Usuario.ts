import mongoose from 'mongoose'

const UsuarioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
})

const Usuario = mongoose.model('Usuario', UsuarioSchema)

export default Usuario
