import { EmailValidator } from '../../protocols/emailValidator'
import { CustomerRepository, CustomerResponse, UpdateCustomerProps } from '../../repositories/customer-repository'

export interface IUpdateCustomer {
  update: (id: string, customerProps: UpdateCustomerProps) => Promise<CustomerResponse | Error >
}

export class UpdateCustomer implements IUpdateCustomer {
  private readonly customerRepository: CustomerRepository
  private readonly emailValidator: EmailValidator

  constructor (customerRepository: CustomerRepository, emailValidator: EmailValidator) {
    this.customerRepository = customerRepository
    this.emailValidator = emailValidator
  }

  async update (id: string, customerProps: UpdateCustomerProps): Promise<CustomerResponse | Error> {
    const updatedCustomerOrNull = await this.customerRepository.update(id, customerProps)
    if (updatedCustomerOrNull === null) {
      return Error('customer don\'t exists in database')
    }
    return updatedCustomerOrNull
  }
}
