import { CustomerRepository, CustomerResponse } from '../../../domain/repositorie-interfaces/customer-repository'
import { IGetOneCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/get-one-customer'

export class GetOneCustomer implements IGetOneCustomer {
  private readonly customerRepository: CustomerRepository

  constructor (customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  async getOne (email: string): Promise<CustomerResponse | Error > {
    const customer = await this.customerRepository.getByEmail(email)
    if (customer === null) {
      return new Error('customer do not exist in database')
    }
    return customer
  }
}
