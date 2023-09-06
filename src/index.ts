import { createApolloServer } from './api/server'
import Database from './config/db'

const startApolloServer = () => {
  const server = createApolloServer()

  server.listen(4000, () => {
    console.log('Servidor de GraphQL iniciado en http://localhost:4000')
  })
}

startApolloServer()

Database.connect()
