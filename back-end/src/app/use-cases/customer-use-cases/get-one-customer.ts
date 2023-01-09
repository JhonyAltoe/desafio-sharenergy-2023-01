import { CustomerRepository, CustomerResponse } from '../../repositories/customer-repository'

export interface IGetOneCustomer {
  getOne: (email: string) => Promise<CustomerResponse | Error >
}

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
