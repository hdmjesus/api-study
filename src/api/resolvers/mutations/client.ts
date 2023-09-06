// import ProductRepository from '../../datasources/ProductRepository'

import ClientRepository from '../../datasources/ClientRepository'

const clientMutations = {
  newClient: async (_: any, data: any, ctx: any) => {
    const { input } = data
    const newClient = await new ClientRepository()

    const client = await newClient.createClient({ input, user: ctx.user })
    return client
  },
  updateClient: async (_: any, data: any, ctx: any) => {
    const { id, input } = data

    const newClient = await new ClientRepository()

    const client = await newClient.updateClient({ id, input, user: ctx.user })
    return client
  },
  deleteClient: async (_: any, data: any, ctx: any) => {
    const { id } = data
    const newClient = await new ClientRepository()

    const client = await newClient.deleteClient({ id, user: ctx.user })
    return client
  }
}

export default clientMutations
