import { factoryEmailValidator } from '../../../domain/entities/factories-for-testing/factory-email-validator'
import { CustomerValidator } from '../../../domain/entities/validations/customer-validator'
import { EmailValidator } from '../../../domain/protocols/emailValidator'
import { CustomerResponse } from '../../../domain/repositorie-interfaces/customer-repository'
import { ICreateCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/create-customer'
import { CreateCustomer } from '../customer-use-cases/create-customer'
import { InMemoryCustomerRepository } from '../customer-use-cases/in-memory-customer-repository/in-memory-customer-repository'

export class FactoryCreateCustomer {
  customerRepository: InMemoryCustomerRepository
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
