import { RemoveCustomer } from '../../data/use-cases/customer-use-cases/remove-customer'
import { CustomerRepository } from '../../domain/repositorie-interfaces/customer-repository'
import { IRemoveCustomer } from '../../domain/use-case-interfaces/customer-use-cases/remove-customer'
import { CustomerRepositoryMongodb } from '../../infra/repositories/customer-repository-mongodb'
import { RemoveCustomerController } from '../../presentation/controllers/customer-controllers/remove-customer-controller'
import { Controller } from '../../presentation/protocols/controller'

class FactoryRemoveCustomerController {
  customerRepository: CustomerRepository
  removeCustomer: IRemoveCustomer
  removeCustomerController: Controller

  constructor () {
    this.customerRepository = new CustomerRepositoryMongodb()
    this.removeCustomer = new RemoveCustomer(this.customerRepository)
    this.removeCustomerController = new RemoveCustomerController(this.removeCustomer)
    this.execute()
  }

  execute (): Controller {
    return this.removeCustomerController
  }
}

export const makeRemoveCustomerController = (): Controller => new FactoryRemoveCustomerController().execute()
