import { CustomerResponse } from '../../../domain/repositorie-types/customer-repository'
import { IRemoveCustomer } from '../../../domain/use-case-types/customer-use-cases/remove-customer'
import { InMemoryCustomerRepository } from '../customer-use-cases/in-memory-customer-repository/in-memory-customer-repository'
import { RemoveCustomer } from '../customer-use-cases/remove-customer'

export class FactoryRemoveCustomer {
  customerRepository: InMemoryCustomerRepository
  constructor (dbCustomersMock: CustomerResponse[]) {
    this.customerRepository = new InMemoryCustomerRepository(dbCustomersMock)
  }

  execute (): IRemoveCustomer {
    return new RemoveCustomer(this.customerRepository)
  }
}
