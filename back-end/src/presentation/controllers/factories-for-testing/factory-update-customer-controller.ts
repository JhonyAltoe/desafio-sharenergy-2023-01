import { PartialCustomerProps } from '../../../domain/entities/validations/customer-validator'
import { CustomerResponse } from '../../../domain/repositorie-interfaces/customer-repository'
import { IUpdateCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/update-customer'
import { Controller } from '../../protocols/controller'
import { UpdateCustomerController } from '../customer-controllers/update-customer-controller'

export const customerResponse: CustomerResponse = {
  _id: 'valid-random-uuid',
  name: 'joao',
  email: 'joaodasilva@email.com',
  cpf: '77777777777',
  address: {
    city: 'serra',
    state: 'MG',
    street: 'rua das uvas',
    number: '222',
    comment: 'my comment'
  },
  phone: '27999997777'
}

export class FactoryUpdateCustomerController {
  updateCustomer: IUpdateCustomer

  constructor (mock?: CustomerResponse | Error) {
    this.updateCustomer = {
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      async update (_id: string, _customerProps: PartialCustomerProps): Promise<CustomerResponse | Error> {
        return customerResponse ?? mock
      }
    }
  }

  execute (): Controller {
    return new UpdateCustomerController(this.updateCustomer)
  }
}
