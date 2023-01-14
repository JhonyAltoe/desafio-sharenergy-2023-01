import { customersMock } from '../../../data/use-cases/customer-use-cases/in-memory-customer-repository/mock/customers-mock'
import { CustomerResponse } from '../../../domain/repositorie-interfaces/customer-repository'
import { IGetAllCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/get-all-customer'
import { Controller } from '../../protocols/controller'
import { GetAllCustomerController } from '../customer-controllers/getall-customer-controller'

export class FactoryGetAllCustomerController {
  getAllCustomer: IGetAllCustomer

  constructor (mock?: CustomerResponse | Error) {
    this.getAllCustomer = {
      async getAll () {
        return customersMock() ?? mock
      }
    }
  }

  execute (): Controller {
    return new GetAllCustomerController(this.getAllCustomer)
  }
}
