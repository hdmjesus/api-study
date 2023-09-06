import mongoose from 'mongoose'

require('dotenv').config({ path: 'variables.env' })

class Database {
  private static instance: Database
  private isConnected: boolean

  private constructor () {
    this.isConnected = false
  }

  public static getInstance (): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  async connect () {
    if (this.isConnected) {
      console.log('Ya estás conectado a la base de datos')
      return
    }

    try {
      await mongoose.connect(process?.env.DB_MONGO!)

      mongoose.connection.on('error', err => {
        console.error('Error de conexión a la base de datos:', err)
        process.exit(1)
      })

      mongoose.connection.once('open', () => {
        console.log('Conexión a la base de datos establecida')
      })

      this.isConnected = true
    } catch (error) {
      console.error('Hubo un error:', error)
      process.exit(1)
    }
  }
}

export default Database.getInstance()
