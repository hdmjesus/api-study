require('dotenv').config({ path: 'variables.env' })

import Client from '../models/Client'

interface IClientCreate {
  input: any
  user: any
}
interface IClientsBySeller {
  input: any
  user: any
}

class ClientRepository {
  async getClient (id: any, user: any) {
    try {
      const client = await Client.findById(id)
      if (!client) {
        throw new Error('Client not found')
      }

      if (client.seller.toString() !== user.id) {
        throw new Error('You are not allowed to see this client')
      }

      return client
    } catch (error) {}
  }
  async getClients () {
    try {
      const clients = await Client.find({})
      return clients
    } catch (error) {}
  }

  async getClientsBySeller ({ user }: IClientsBySeller) {
    try {
      const clients = await Client.find({ seller: user.id.toString() })
      return clients
    } catch (error) {}
  }

  async createClient ({ input, user }: IClientCreate) {
    const { email } = input
    const hasClient = await Client.findOne({ email })

    try {
      if (hasClient) {
        throw new Error('Client already exists')
      } else {
        const newClient = new Client(input)
        newClient.seller = user.id

        return await newClient.save()
      }
    } catch (error) {
      console.log(error, 'errorsito')
    }
  }

  async updateClient ({ id, input, user }: any) {
    let client = await Client.findById(id)

    if (!client) {
      throw new Error('Client not found')
    }
    if (client.seller.toString() !== user.id) {
      throw new Error('You are not allowed to see this client')
    }

    const updateClient = await Client.findOneAndUpdate({ _id: id }, input, {
      new: true
    })

    return updateClient
  }
  async deleteClient ({ id, user }: any) {
    let client = await Client.findById(id)
    if (!client) {
      throw new Error("Client doesn't exist")
    }

    if (client.seller.toString() !== user.id) {
      throw new Error('You are not allowed to see this client')
    }

    const removedClient = Client.findOneAndDelete({ _id: id })

    return removedClient
  }
}

export default ClientRepository
