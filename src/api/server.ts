const { ApolloServer } = require('apollo-server')
let localtypeDefs = require('./schemas/schema.graphql')
let localResolvers = require('./resolvers/resolvers')
import type { Request } from 'express'

import UserPassword from '../services/userPassword'

require('dotenv').config({ path: 'variables.env' })
interface MyContext {
  req: Request
}

export function createApolloServer () {
  return new ApolloServer({
    typeDefs: localtypeDefs,
    resolvers: localResolvers,
    context: async ({ req }: MyContext) => {
      // console.log(req.headers['authorization'])
      const token = req.headers['authorization'] || ''

      if (token) {
        try {
          const user = await new UserPassword().verifyToken(
            token,
            process.env.FIRM_TOKEN!
          )

          return { user }
        } catch (error) {
          console.log(error)
        }
      }
    }
  })
}
