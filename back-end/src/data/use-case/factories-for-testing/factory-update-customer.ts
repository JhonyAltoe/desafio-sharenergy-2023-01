import { factoryEmailValidator } from '../../../domain/entities/factories-for-testing/factory-email-validator'
import { CustomerValidator, ICustomerValidator } from '../../../domain/entities/validations/customer-validator'
import { CustomerResponse } from '../../../domain/repositorie-types/customer-repository'
import { IUpdateCustomer } from '../../../domain/use-case-types/customer-use-cases/update-customer'
import { InMemoryCustomerRepository } from '../customer-use-cases/in-memory-customer-repository/in-memory-customer-repository'
import { UpdateCustomer } from '../customer-use-cases/update-customer'

export class FactoryUpdateCustomer {
  customerRepository: InMemoryCustomerRepository
  customerValidator: ICustomerValidator

  constructor (dbCustomersMock: CustomerResponse[]) {
    this.customerRepository = new InMemoryCustomerRepository(dbCustomersMock)
    this.customerValidator = new CustomerValidator(factoryEmailValidator())
  }

  execute (): IUpdateCustomer {
    return new UpdateCustomer(this.customerRepository, this.customerValidator)
  }
}
