import { CustomerRepository, ICustomerResponse, ICustomerPersistence } from '../../../repositories/customer-repository'

export class InMemoryCustomerRepository implements CustomerRepository {
  private readonly customers: ICustomerResponse[]

  constructor (customers: ICustomerResponse[]) {
    this.customers = customers
  }

  async create (customer: ICustomerPersistence): Promise<ICustomerResponse> {
    this.customers.push(customer as ICustomerResponse)
    return customer as ICustomerResponse
  }

  // async remove (id: string): Promise<void> {
  //   let c: ICustomerResponse
  //   for (c of this.customers) {
  //     if (c.id === id) {
  //       const customerIndex = this.customers.indexOf(c)
  //       this.customers.splice(customerIndex, 1)
  //     }
  //   }
  // }

  remove: (id: string) => Promise<void>
  getByEmail: (email: string) => Promise<ICustomerResponse>
  update: (id: string, customer: Partial<ICustomerPersistence>) => Promise<ICustomerResponse>
}
