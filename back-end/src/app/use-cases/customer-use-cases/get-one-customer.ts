import { EmailValidator } from '../../protocols/emailValidator'
import { CustomerRepository, CustomerResponse } from '../../repositories/customer-repository'

export interface IGetOneCustomer {
  getOne: (email: string) => Promise<CustomerResponse>
}

export class GetOneCustomer implements IGetOneCustomer {
  private readonly customerRepository: CustomerRepository
  private readonly emailValidator: EmailValidator

  constructor (customerRepository: CustomerRepository, emailValidator: EmailValidator) {
    this.customerRepository = customerRepository
    this.emailValidator = emailValidator
  }

  getOne: (email: string) => Promise<CustomerResponse>
}
