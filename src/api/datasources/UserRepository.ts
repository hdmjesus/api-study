require('dotenv').config({ path: 'variables.env' })
import Usuario from '../models/Usuario'

import { UserInput } from '../../interface/user.interface'
import UserPassword from '../../services/userPassword'

class UserRepository {
  async findByEmail (email: string): Promise<any> {
    return await Usuario.findOne({ email })
  }

  async create (input: UserInput): Promise<any> {
    const { email, password, lastName, name } = input

    // Revisar si el usuario ya está registrado
    const isExisteUser = await this.findByEmail(email)
    if (isExisteUser) {
      throw new Error('El usuario ya está registrado')
    }

    const userPassword = new UserPassword()
    const passwordHasher = await userPassword.hashPassword(password)

    try {
      const usuario = new Usuario({
        email,
        password: passwordHasher,
        lastName,
        name
      })

      await usuario.save()
      return usuario
    } catch (error) {
      console.log(error)
      throw new Error('Error al guardar el usuario en la base de datos')
    }
  }

  async auth (input: UserInput): Promise<any> {
    const { email, password } = input
    // Revisar si el usuario ya está registrado
    const isExisteUser = await this.findByEmail(email)

    if (!isExisteUser) {
      throw new Error('El usuario no esta registrado')
    }

    // Revisar si el password es correcto
    const userPassword = new UserPassword()
    const isCorrectPassword = await userPassword.comparePassword(
      password,
      isExisteUser.password
    )
    if (!isCorrectPassword) {
      throw new Error('Contraseña incorrecta')
    }

    return {
      token: await userPassword.getToken(
        isExisteUser,
        process?.env?.FIRM_TOKEN!,
        '24h'
      )
    }
  }

  async getUserToken (token: string): Promise<any> {
    const userPassword = new UserPassword()
    const user = await userPassword.verifyToken(
      token,
      process?.env?.FIRM_TOKEN!
    )
    return user
  }
}

export default UserRepository
