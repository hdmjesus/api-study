const { gql } = require('apollo-server')

const inputType = require('./input/index.graphql')
const types = require('./type/index.graphql')

const typeDefs = gql`
  enum StateOrder {
    PENDING
    COMPLETED
    CANCELED
  }
  ${inputType}
  ${types}
`
module.exports = typeDefs
