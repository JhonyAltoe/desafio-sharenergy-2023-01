import { CustomerRepository } from '../../repositories/customer-repository'

export interface IRemoveCustomer {
  remove: (id: string) => Promise<void>
}

export class RemoveCustomer implements IRemoveCustomer {
  private readonly customerRepository: CustomerRepository

  constructor (customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  async remove (id: string): Promise<void> {
    await this.customerRepository.remove(id)
  }
}
