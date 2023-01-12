import { customerResponse } from '../../../domain/entities/customer.test'
import { CustomerResponse } from '../../../domain/repositorie-interfaces/customer-repository'
import { IGetOneCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/get-one-customer'
import { Controller } from '../../protocols/controller'
import { GetOneCustomerController } from '../customer-controllers/get-one-customer-controller'

export class FactoryGetOneCustomerController {
  private readonly getOneCustomer: IGetOneCustomer

  constructor (mock?: CustomerResponse) {
    this.getOneCustomer = {
      async getOne (_email) {
        return customerResponse ?? mock
      }
    }
  }

  execute (): Controller {
    return new GetOneCustomerController(this.getOneCustomer)
  }
}
