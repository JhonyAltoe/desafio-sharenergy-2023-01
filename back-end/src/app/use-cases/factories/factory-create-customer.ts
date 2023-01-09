import { fctEmailValidator } from '../../entities/customer.test'
import { EmailValidator } from '../../protocols/emailValidator'
import { CustomerResponse } from '../../repositories/customer-repository'
import { CreateCustomer, ICreateCustomer } from '../customer-use-cases/create-customer'
import { InMemoryCustomerRepository } from '../customer-use-cases/in-memory-customer-repository/in-memory-customer-repository'

export class FactoryCreateCustomer {
  customerRepository: InMemoryCustomerRepository
  emailValidator: EmailValidator

  constructor (dbCustomersMock: CustomerResponse[]) {
    this.customerRepository = new InMemoryCustomerRepository(dbCustomersMock)
    this.emailValidator = fctEmailValidator()
  }

  execute (): ICreateCustomer {
    return new CreateCustomer(this.customerRepository, this.emailValidator)
  }
}
