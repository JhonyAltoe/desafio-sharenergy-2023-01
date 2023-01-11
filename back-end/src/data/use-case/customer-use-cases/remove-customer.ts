import { CustomerRepository } from '../../../domain/repositorie-types/customer-repository'
import { IRemoveCustomer } from '../../../domain/use-case-types/customer-use-cases/remove-customer'

export class RemoveCustomer implements IRemoveCustomer {
  private readonly customerRepository: CustomerRepository

  constructor (customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  async remove (id: string): Promise<void> {
    await this.customerRepository.remove(id)
  }
}
