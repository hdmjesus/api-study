import UserRepository from '../../datasources/UserRepository'

const userMutations = {
  newUser: async (_: any, data: any) => {
    const { input }: any = data

    const user = new UserRepository()
    const newUser = await user.create(input)

    return newUser
  },
  authUser: async (_: any, data: any) => {
    const { input }: any = data

    const user = new UserRepository()
    const token = await user.auth(input)

    return token
  }
}

export default userMutations
