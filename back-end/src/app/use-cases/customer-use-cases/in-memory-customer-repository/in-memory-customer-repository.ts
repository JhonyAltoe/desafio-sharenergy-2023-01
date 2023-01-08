import { CustomerRepository, ICustomerResponse, ICustomerPersistence } from '../../../repositories/customer-repository'

export class InMemoryCustomerRepository implements CustomerRepository {
  customers: ICustomerResponse[] = []

  constructor (customers: ICustomerResponse[]) {
    this.customers = customers
  }

  async create (customer: ICustomerPersistence): Promise<ICustomerResponse> {
    this.customers.push(customer as ICustomerResponse)
    return customer as ICustomerResponse
  }

  async remove (id: string): Promise<void> {
    let c: ICustomerResponse
    for (c of this.customers) {
      if (c.id === id) {
        const customerIndex = this.customers.indexOf(c)
        this.customers.splice(customerIndex, 1)
      }
    }
  }

  async getByEmail (email: string): Promise<ICustomerResponse | null> {
    let c: ICustomerResponse
    for (c of this.customers) {
      if (c.email === email) {
        return c
      }
    }
    return null
  }

  update: (id: string, customer: Partial<ICustomerPersistence>) => Promise<ICustomerResponse>
}
