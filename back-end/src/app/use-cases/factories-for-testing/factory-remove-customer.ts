import { CustomerResponse } from '../../repositories/customer-repository'
import { InMemoryCustomerRepository } from '../customer-use-cases/in-memory-customer-repository/in-memory-customer-repository'
import { IRemoveCustomer, RemoveCustomer } from '../customer-use-cases/remove-customer'

export class FactoryRemoveCustomer {
  customerRepository: InMemoryCustomerRepository
  constructor (dbCustomersMock: CustomerResponse[]) {
    this.customerRepository = new InMemoryCustomerRepository(dbCustomersMock)
  }

  execute (): IRemoveCustomer {
    return new RemoveCustomer(this.customerRepository)
  }
}
