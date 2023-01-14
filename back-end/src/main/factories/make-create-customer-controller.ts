import { CreateCustomer } from '../../data/use-cases/customer-use-cases/create-customer'
import { CustomerValidator, ICustomerValidator } from '../../domain/entities/validations/customer-validator'
import { EmailValidator } from '../../domain/protocols/emailValidator'
import { CustomerRepository } from '../../domain/repositorie-interfaces/customer-repository'
import { ICreateCustomer } from '../../domain/use-case-interfaces/customer-use-cases/create-customer'
import { EmailValidatorJoi } from '../../infra/adapters/customer-validator'
import { CustomerRepositoryMongodb } from '../../infra/repositories/customer-repository-mongodb'
import { CreateCustomerController } from '../../presentation/controllers/customer-controllers/create-customer-controller'
import { Controller } from '../../presentation/protocols/controller'

class FactoryCreateCustomerController {
  emailValidator: EmailValidator
  customerValidator: ICustomerValidator
  customerRepository: CustomerRepository
  createCustomer: ICreateCustomer
  createCustomerController: Controller

  constructor () {
    this.emailValidator = new EmailValidatorJoi()
    this.customerValidator = new CustomerValidator(this.emailValidator)
    this.customerRepository = new CustomerRepositoryMongodb()
    this.createCustomer = new CreateCustomer(this.customerRepository, this.customerValidator)
    this.createCustomerController = new CreateCustomerController(this.createCustomer)
    this.execute()
  }

  execute (): Controller {
    return this.createCustomerController
  }
}

export const makeCreateCustomerController = (): Controller => new FactoryCreateCustomerController().execute()
