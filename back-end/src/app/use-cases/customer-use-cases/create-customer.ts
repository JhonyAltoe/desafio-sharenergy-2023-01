import { Customer, CustomerProps } from '../../entities/customer'
import { EmailValidator } from '../../protocols/emailValidator'
import { ICustomerResponse, CustomerRepository } from '../../repositories/customer-repository'

export interface ICreateCustomer {
  create: (newCustomer: CustomerProps) => Promise<ICustomerResponse | Error>
}

export class CreateCustomer implements ICreateCustomer {
  private readonly customerRepository: CustomerRepository
  private readonly emailValidator: EmailValidator

  constructor (customerRepository: CustomerRepository, emailValidator: EmailValidator) {
    this.customerRepository = customerRepository
    this.emailValidator = emailValidator
  }

  async create (customerProps: CustomerProps): Promise<ICustomerResponse | Error> {
    const newCustomer = new Customer(customerProps, this.emailValidator, 'testUUID')
    const error = newCustomer.validate()
    if (error instanceof Error) {
      return error
    }
    const exists = await this.customerRepository.exists(customerProps.email)
    if (exists === true) {
      return new Error('customer already exists')
    }
    const response = await this.customerRepository.create(newCustomer.value)
    return response
  }
}
