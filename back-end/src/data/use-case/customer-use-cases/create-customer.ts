import { Customer, CustomerProps } from '../../../domain/entities/customer'
import { CustomerValidator } from '../../../domain/entities/validations/customer-validator'
import { CustomerRepository, CustomerResponse } from '../../../domain/repositorie-types/customer-repository'
import { ICreateCustomer } from '../../../domain/use-case-types/customer-use-cases/create-customer'

export class CreateCustomer implements ICreateCustomer {
  private readonly customerRepository: CustomerRepository
  private readonly customerValidator: CustomerValidator

  constructor (customerRepository: CustomerRepository, customerValidator: CustomerValidator) {
    this.customerRepository = customerRepository
    this.customerValidator = customerValidator
  }

  async create (customerProps: CustomerProps): Promise<CustomerResponse | Error> {
    const newCustomer = new Customer(customerProps, this.customerValidator)
    const error = newCustomer.validateCustomer()
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
