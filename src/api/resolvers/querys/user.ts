import UserRepository from '../../datasources/UserRepository'

const userQuery = {
  getUser: (_: any, args: any) => {
    const user = new UserRepository()
    const UserToken = user.getUserToken(args.token)

    return UserToken
  }
}

export default userQuery
