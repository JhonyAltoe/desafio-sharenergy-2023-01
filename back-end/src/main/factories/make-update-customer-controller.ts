import { UpdateCustomer } from '../../data/use-cases/customer-use-cases/update-customer'
import { CustomerValidator, ICustomerValidator } from '../../domain/entities/validations/customer-validator'
import { EmailValidator } from '../../domain/protocols/emailValidator'
import { CustomerRepository } from '../../domain/repositorie-interfaces/customer-repository'
import { IUpdateCustomer } from '../../domain/use-case-interfaces/customer-use-cases/update-customer'
import { EmailValidatorJoi } from '../../infra/adapters/customer-validator'
import { CustomerRepositoryMongodb } from '../../infra/repositories/customer-repository-mongodb'
import { UpdateCustomerController } from '../../presentation/controllers/customer-controllers/update-customer-controller'
import { Controller } from '../../presentation/protocols/controller'

class FactoryUpdateCustomerController {
  emailValidator: EmailValidator
  customerValidator: ICustomerValidator
  customerRepository: CustomerRepository
  updateCustomer: IUpdateCustomer
  updateCustomerController: Controller

  constructor () {
    this.emailValidator = new EmailValidatorJoi()
    this.customerValidator = new CustomerValidator(this.emailValidator)
    this.customerRepository = new CustomerRepositoryMongodb()
    this.updateCustomer = new UpdateCustomer(this.customerRepository, this.customerValidator)
    this.updateCustomerController = new UpdateCustomerController(this.updateCustomer)
    this.execute()
  }

  execute (): Controller {
    return this.updateCustomerController
  }
}

export const makeUpdateCustomerController = (): Controller => new FactoryUpdateCustomerController().execute()
