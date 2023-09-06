import clientQuery from './client'
import courseQuery from './courses'
import productQuery from './product'
import tecnologiesQuery from './tecnology'
import userQuery from './user'

const queryResolvers = {
  Query: {
    ...courseQuery,
    ...tecnologiesQuery,
    ...userQuery,
    ...productQuery,
    ...clientQuery
  }
}

export default queryResolvers
