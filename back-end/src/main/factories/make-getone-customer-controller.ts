import { GetOneCustomer } from '../../data/use-cases/customer-use-cases/get-one-customer'
import { CustomerRepository } from '../../domain/repositorie-interfaces/customer-repository'
import { IGetOneCustomer } from '../../domain/use-case-interfaces/customer-use-cases/get-one-customer'
import { CustomerRepositoryMongodb } from '../../infra/repositories/customer-repository-mongodb'
import { GetOneCustomerController } from '../../presentation/controllers/customer-controllers/get-one-customer-controller'
import { Controller } from '../../presentation/protocols/controller'

class FactoryGetOneCustomerController {
  customerRepository: CustomerRepository
  getOneCustomer: IGetOneCustomer
  getOneCustomerController: Controller

  constructor () {
    this.customerRepository = new CustomerRepositoryMongodb()
    this.getOneCustomer = new GetOneCustomer(this.customerRepository)
    this.getOneCustomerController = new GetOneCustomerController(this.getOneCustomer)
    this.execute()
  }

  execute (): Controller {
    return this.getOneCustomerController
  }
}

export const makeGetOneCustomerController = (): Controller => new FactoryGetOneCustomerController().execute()
