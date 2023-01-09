import { CustomerRepository, CustomerResponse, CustomerRequest } from '../../../repositories/customer-repository'

export class InMemoryCustomerRepository implements CustomerRepository {
  customers: CustomerResponse[] = []

  constructor (customers: CustomerResponse[]) {
    this.customers = customers
  }

  async create (customer: CustomerRequest): Promise<CustomerResponse> {
    this.customers.push(customer as CustomerResponse)
    return customer as CustomerResponse
  }

  async remove (id: string): Promise<void> {
    let c: CustomerResponse
    for (c of this.customers) {
      if (c.id === id) {
        const customerIndex = this.customers.indexOf(c)
        this.customers.splice(customerIndex, 1)
      }
    }
  }

  async getByEmail (email: string): Promise<CustomerResponse | null> {
    let c: CustomerResponse
    for (c of this.customers) {
      if (c.email === email) {
        return c
      }
    }
    return null
  }

  async update (id: string, customer: Partial<CustomerRequest>): Promise<CustomerResponse | null> {
    for (let i = 0; i < this.customers.length; i++) {
      if (this.customers[i].id === id) {
        const newCustomer = { ...this.customers[i], ...customer }
        this.customers[i] = newCustomer
        return this.customers[i]
      }
    }
    return null
  }

  async exists (email: string): Promise<Boolean> {
    return this.customers.some((c) => c.email === email)
  }
}
