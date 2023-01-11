import { CustomerResponse } from '../../../domain/repositorie-types/customer-repository'
import { IGetOneCustomer } from '../../../domain/use-case-types/customer-use-cases/get-one-customer'
import { GetOneCustomer } from '../customer-use-cases/get-one-customer'
import { InMemoryCustomerRepository } from '../customer-use-cases/in-memory-customer-repository/in-memory-customer-repository'

export class FactoryGetOneCustomer {
  customerRepository: InMemoryCustomerRepository

  constructor (dbCustomersMock: CustomerResponse[]) {
    this.customerRepository = new InMemoryCustomerRepository(dbCustomersMock)
  }

  execute (): IGetOneCustomer {
    return new GetOneCustomer(this.customerRepository)
  }
}
