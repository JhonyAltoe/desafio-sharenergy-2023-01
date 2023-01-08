import { CustomerRepository, ICustomerResponse, ICustomerRequest } from '../../../repositories/customer-repository'

export class InMemoryCustomerRepository implements CustomerRepository {
  customers: ICustomerResponse[] = []

  constructor (customers: ICustomerResponse[]) {
    this.customers = customers
  }

  async create (customer: ICustomerRequest): Promise<ICustomerResponse> {
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

  async update (id: string, customer: Partial<ICustomerRequest>): Promise<ICustomerResponse | null> {
    for (let i = 0; i < this.customers.length; i++) {
      if (this.customers[i].id === id) {
        const newCustomer = { ...this.customers[i], ...customer }
        this.customers[i] = newCustomer
        return this.customers[i]
      }
    }
    return null
  }
}
