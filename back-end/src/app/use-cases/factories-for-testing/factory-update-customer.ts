import { factoryEmailValidator } from '../../entities/factories-for-testing/factory-email-validator'
import { EmailValidator } from '../../protocols/emailValidator'
import { CustomerRepository, CustomerResponse } from '../../repositories/customer-repository'
import { InMemoryCustomerRepository } from '../customer-use-cases/in-memory-customer-repository/in-memory-customer-repository'
import { IUpdateCustomer, UpdateCustomer } from '../customer-use-cases/update-customer'

export class FactoryUpdateCustomer {
  customerRepository: CustomerRepository
  emailValidator: EmailValidator

  constructor (dbCustomersMock: CustomerResponse[]) {
    this.customerRepository = new InMemoryCustomerRepository(dbCustomersMock)
    this.emailValidator = factoryEmailValidator()
  }

  execute (): IUpdateCustomer {
    return new UpdateCustomer(this.customerRepository, this.emailValidator)
  }
}
