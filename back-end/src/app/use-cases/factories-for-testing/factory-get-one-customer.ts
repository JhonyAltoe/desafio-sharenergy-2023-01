import { CustomerRepository, CustomerResponse } from '../../repositories/customer-repository'
import { GetOneCustomer, IGetOneCustomer } from '../customer-use-cases/get-one-customer'
import { InMemoryCustomerRepository } from '../customer-use-cases/in-memory-customer-repository/in-memory-customer-repository'

export class FactoryGetOneCustomer {
  customerRepository: CustomerRepository

  constructor (dbCustomersMock: CustomerResponse[]) {
    this.customerRepository = new InMemoryCustomerRepository(dbCustomersMock)
  }

  execute (): IGetOneCustomer {
    return new GetOneCustomer(this.customerRepository)
  }
}
