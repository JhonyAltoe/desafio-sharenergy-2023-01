import { customersMock } from './mock/customers-mock'
import { InMemoryCustomerRepository } from './in-memory-customer-repository'
import { ICustomerPersistence } from '../../../repositories/customer-repository'

describe('in-memory-customer-repository', () => {
  it('should return create new customer and return it', async () => {
    const newCustomer: ICustomerPersistence = {
      id: 'uuid-3',
      name: 'daniel',
      email: 'daniel@email.com',
      cpf: '77777777777',
      address: {
        city: 'serra',
        state: 'ES',
        street: 'rua das uvas',
        number: '222',
        comment: 'my comment'
      },
      phone: '27999997777'
    }
    const customerRepo = new InMemoryCustomerRepository(customersMock)
    const customer = await customerRepo.create(newCustomer)
    expect(customer).toEqual(newCustomer)
    expect(customerRepo.customers[2]).toEqual(newCustomer)
  })
})
