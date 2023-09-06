const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserPassword {
  private readonly saltRounds: number

  constructor (saltRounds: number = 10) {
    this.saltRounds = saltRounds
  }

  async hashPassword (password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(this.saltRounds)
    const hashedPassword = await bcryptjs.hash(password, salt)
    return hashedPassword
  }

  async comparePassword (
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isCorrectPassword = await bcryptjs.compare(password, hashedPassword)
    return isCorrectPassword
  }

  async getToken (user: any, key: string, expiresIn: string): Promise<string> {
    const { id, email, lastName, name } = user

    return jwt.sign({ lastName, email, id, name }, key, {
      expiresIn: expiresIn
    })
  }

  async verifyToken (token: string, key: string): Promise<string> {
    const user = await jwt.verify(token, key)
    return user
  }
}

export default UserPassword
