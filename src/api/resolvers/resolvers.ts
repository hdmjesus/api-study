import mutationResolvers from './mutations'
import queryResolvers from './querys'

const resolvers = {
  ...queryResolvers,
  ...mutationResolvers
}

module.exports = resolvers
