import { CreateCustomer } from '../../../data/use-cases/customer-use-cases/create-customer'
import { InMemoryCustomerRepository } from '../../../data/use-cases/customer-use-cases/in-memory-customer-repository/in-memory-customer-repository'
import { factoryEmailValidator } from '../../../domain/entities/factories-for-testing/factory-email-validator'
import { CustomerValidator, ICustomerValidator } from '../../../domain/entities/validations/customer-validator'
import { EmailValidator } from '../../../domain/protocols/emailValidator'
import { CustomerResponse } from '../../../domain/repositorie-interfaces/customer-repository'
import { ICreateCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/create-customer'
import { Controller } from '../../protocols/controller'
import { CreateCustomerController } from '../customer-controllers/create-customer-controller'

export class FactoryCreateCustomerController {
  createCustomer: ICreateCustomer
  inMemoryCustomerRepository: InMemoryCustomerRepository
  emailValidator: EmailValidator
  customerValidator: ICustomerValidator

  constructor (dbCustomersMock: CustomerResponse[]) {
    this.inMemoryCustomerRepository = new InMemoryCustomerRepository(dbCustomersMock)
    this.emailValidator = factoryEmailValidator()
    this.customerValidator = new CustomerValidator(this.emailValidator)
    this.createCustomer = new CreateCustomer(this.inMemoryCustomerRepository, this.customerValidator)
  }

  execute (): Controller {
    return new CreateCustomerController(this.createCustomer)
  }
}
