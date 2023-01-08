import { customersMock } from './mock/customers-mock'
import { InMemoryCustomerRepository } from './in-memory-customer-repository'
import { ICustomerRequest } from '../../../repositories/customer-repository'

describe('in-memory-customer-repository', () => {
  it('01 - should return create new customer and return it', async () => {
    const newCustomer: ICustomerRequest = {
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
    const customerRepo = new InMemoryCustomerRepository(customersMock())
    const customer = await customerRepo.create(newCustomer)
    expect(customer).toEqual(newCustomer)
    expect(customerRepo.customers[2]).toEqual(newCustomer)
  })

  it('02 - should remove a customer', async () => {
    const customerRepo = new InMemoryCustomerRepository(customersMock())
    await customerRepo.remove('uuid-1')
    const shouldBeUndefined = customerRepo.customers.find((c) => c.id === 'uuid-1')
    expect(customerRepo.customers.length).toBe(1)
    expect(shouldBeUndefined).toEqual(undefined)
  })

  it('03 - should return a customer if exists in batabase', async () => {
    const customerRepo = new InMemoryCustomerRepository(customersMock())
    const customer = await customerRepo.getByEmail('maria@email.com')
    expect(customer?.name).toBe('maria')
  })

  it('04 - should update if find corresponding id', async () => {
    const customerRepo = new InMemoryCustomerRepository(customersMock())
    const updatedCustomer = await customerRepo.update('uuid-1', { email: 'joaodasilva@email.com' })
    expect(updatedCustomer?.email).toBe('joaodasilva@email.com')
    expect(customerRepo.customers[0].email).toBe('joaodasilva@email.com')
  })
})
