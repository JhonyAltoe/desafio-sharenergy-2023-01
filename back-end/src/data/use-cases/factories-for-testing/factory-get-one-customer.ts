import { CustomerResponse } from '../../../domain/repositorie-interfaces/customer-repository'
import { IGetOneCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/get-one-customer'
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
