const inputTypeDefs = `
  input OrderProductInput {
    id: ID
    count: Int
  }
  input OrderInput {
    order: [OrderProductInput]
    total: Float!
    client: ID!
    state: StateOrder
    createdAt: String
  }

  input ClientInput {
    name: String!
    lastName: String!
    company: String!
    email: String!
    phone: String
  }
  input OrderProductInput {
    id: ID
    count: Int
  }

  input CursoInput {
    tecnologia: String
  }

  input UserInput {
    name: String
    lastName: String
    email: String
    password: String
  }

  input AuthInput {
    email: String!
    password: String!
  }

  input ProductoInput {
    name: String!
    count: Int!
    price: Float!
  }
`

module.exports = inputTypeDefs
