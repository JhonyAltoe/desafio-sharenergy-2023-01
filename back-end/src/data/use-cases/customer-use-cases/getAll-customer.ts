import { CustomerRepository, CustomerResponse } from '../../../domain/repositorie-interfaces/customer-repository'
import { IGetAllCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/get-all-customer'

export class GetAllCustomer implements IGetAllCustomer {
  private readonly customerRepository: CustomerRepository

  constructor (customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  async getAll (): Promise<CustomerResponse[] > {
    const customer = await this.customerRepository.getAll()
    return customer
  }
}
