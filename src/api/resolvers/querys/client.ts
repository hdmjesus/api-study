import ClientRepository from '../../datasources/ClientRepository'

const clientQuery = {
  getClients: (_: any, args: any) => {
    const allClients = new ClientRepository().getClients()
    return allClients
  },

  getClientBySeller: (_: any, args: any, ctx: any) => {
    const allClients = new ClientRepository().getClientsBySeller(ctx)
    return allClients
  },
  getClient: (_: any, args: any, ctx: any) => {
    const client = new ClientRepository().getClient(args.id, ctx)
    return client
  }
}

export default clientQuery
