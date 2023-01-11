import { factoryEmailValidator } from '../../entities/factories-for-testing/factory-email-validator'
import { CustomerValidator, ICustomerValidator } from '../../entities/validations/customer-validator'
import { CustomerRepository, CustomerResponse } from '../../repositories/customer-repository'
import { InMemoryCustomerRepository } from '../customer-use-cases/in-memory-customer-repository/in-memory-customer-repository'
import { IUpdateCustomer, UpdateCustomer } from '../customer-use-cases/update-customer'

export class FactoryUpdateCustomer {
  customerRepository: CustomerRepository
  customerValidator: ICustomerValidator

  constructor (dbCustomersMock: CustomerResponse[]) {
    this.customerRepository = new InMemoryCustomerRepository(dbCustomersMock)
    this.customerValidator = new CustomerValidator(factoryEmailValidator())
  }

  execute (): IUpdateCustomer {
    return new UpdateCustomer(this.customerRepository, this.customerValidator)
  }
}
