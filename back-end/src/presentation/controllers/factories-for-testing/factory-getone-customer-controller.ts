import { customerResponse } from '../../../domain/entities/customer.test'
import { CustomerResponse } from '../../../domain/repositorie-interfaces/customer-repository'
import { IGetOneCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/get-one-customer'
import { Controller } from '../../protocols/controller'
import { GetOneCustomerController } from '../customer-controllers/get-one-customer-controller'

export class FactoryGetOneCustomerController {
  getOneCustomer: IGetOneCustomer

  constructor (mock?: CustomerResponse | Error) {
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
