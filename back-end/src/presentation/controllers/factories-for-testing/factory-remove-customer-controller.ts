import { IRemoveCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/remove-customer'
import { Controller } from '../../protocols/controller'
import { RemoveCustomerController } from '../customer-controllers/remove-customer-controller'

export class FactoryRemoveCustomerController {
  removeCustomer: IRemoveCustomer

  constructor () {
    this.removeCustomer = {
      async remove (_id: string): Promise<void> {}
    }
  }

  execute (): Controller {
    return new RemoveCustomerController(this.removeCustomer)
  }
}
