import { ICustomerValidator, PartialCustomerProps } from '../../entities/validations/customer-validator'
import { CustomerRepository, CustomerResponse } from '../../repositories/customer-repository'

export interface IUpdateCustomer {
  update: (id: string, customerProps: PartialCustomerProps) => Promise<CustomerResponse | Error >
}

export class UpdateCustomer implements IUpdateCustomer {
  private readonly customerRepository: CustomerRepository
  private readonly customerValidator: ICustomerValidator

  constructor (customerRepository: CustomerRepository, customerValidator: ICustomerValidator) {
    this.customerRepository = customerRepository
    this.customerValidator = customerValidator
  }

  async update (id: string, customerProps: PartialCustomerProps): Promise<CustomerResponse | Error> {
    const errorOrUndefined = this.customerValidator.validateCustomer(customerProps)
    if (errorOrUndefined instanceof Error) {
      return errorOrUndefined
    }

    const updatedCustomerOrNull = await this.customerRepository.update(id, customerProps)
    if (updatedCustomerOrNull === null) {
      return Error('customer don\'t exists in database')
    }
    return updatedCustomerOrNull
  }
}
