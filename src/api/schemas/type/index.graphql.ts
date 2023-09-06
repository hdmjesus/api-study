const typeBussinesDefs = `
type Curso {
  title: String
  tecnologia: String
}

type Tecnology {
  tecnologia: String
}

type User {
  name: String
  lastName: String
  email: String
  created: String
}

type Producto {
  name: String
  count: Int
  price: Float
  created: String
}

type Client {
  name: String
  lastName: String
  company: String
  email: String
  phone: String
  seller: ID
  createdAt: String
}

type OrderProduct {
  id: ID
  count: Int
}
type Order {
  id: ID
  order: [OrderProduct]
  total: Float
  client: Client
  seller: ID
  state: StateOrder
  createdAt: String
}

type Token {
  token: String
}

type Mutation {
  newUser(input: UserInput): User
  authUser(input: AuthInput): Token
  newProduct(input: ProductoInput): Producto
  updateProduct(_id: ID!, input: ProductoInput): Producto
  deleteProduct(_id: ID!): Producto
  newClient(input: ClientInput): Client
  updateClient(_id: ID!, input: ClientInput): Client
  deleteClient(_id: ID!): Client
  newOrder(input: OrderInput): Order
}

type Query {
  obtenerCursos(input: CursoInput!): [Curso]
  getUser(token: String): User
  obtenerTecnologia: [Tecnology]
  getProducts: [Producto]
  getProduct(_id: ID!): Producto
  getClients: [Client]
  getClientBySeller: [Client]
  getClient(_id: ID!): Client
}
`

module.exports = typeBussinesDefs
