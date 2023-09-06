import clientMutations from './client'

import productMutations from './product'
import userMutations from './user'

const mutationResolvers = {
  Mutation: {
    ...userMutations,
    ...productMutations,
    ...clientMutations
    // ...orderMutations
  }
}

export default mutationResolvers
