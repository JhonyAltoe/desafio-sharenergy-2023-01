import { factoryEmailValidator } from '../../entities/factories-for-testing/factory-email-validator'
import { EmailValidator } from '../../protocols/emailValidator'
import { CustomerRepository, CustomerResponse } from '../../repositories/customer-repository'
import { CreateCustomer, ICreateCustomer } from '../customer-use-cases/create-customer'
import { InMemoryCustomerRepository } from '../customer-use-cases/in-memory-customer-repository/in-memory-customer-repository'
import { CustomerValidator } from '../../entities/validations/customer-validator'

export class FactoryCreateCustomer {
  customerRepository: CustomerRepository
  emailValidator: EmailValidator
  customerValidator: CustomerValidator

  constructor (dbCustomersMock: CustomerResponse[]) {
    this.customerRepository = new InMemoryCustomerRepository(dbCustomersMock)
    this.emailValidator = factoryEmailValidator()
    this.customerValidator = new CustomerValidator(this.emailValidator)
  }

  execute (): ICreateCustomer {
    return new CreateCustomer(this.customerRepository, this.customerValidator)
  }
}
