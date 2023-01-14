import { GetAllCustomer } from '../../data/use-cases/customer-use-cases/getAll-customer'
import { CustomerRepository } from '../../domain/repositorie-interfaces/customer-repository'
import { IGetAllCustomer } from '../../domain/use-case-interfaces/customer-use-cases/get-all-customer'
import { CustomerRepositoryMongodb } from '../../infra/repositories/customer-repository-mongodb'
import { GetAllCustomerController } from '../../presentation/controllers/customer-controllers/getall-customer-controller'
import { Controller } from '../../presentation/protocols/controller'

class FactoryGetAllCustomerController {
  customerRepository: CustomerRepository
  getAllCustomer: IGetAllCustomer
  getAllCustomerController: Controller

  constructor () {
    this.customerRepository = new CustomerRepositoryMongodb()
    this.getAllCustomer = new GetAllCustomer(this.customerRepository)
    this.getAllCustomerController = new GetAllCustomerController(this.getAllCustomer)
    this.execute()
  }

  execute (): Controller {
    return this.getAllCustomerController
  }
}

export const makeGetAllCustomerController = (): Controller => new FactoryGetAllCustomerController().execute()
