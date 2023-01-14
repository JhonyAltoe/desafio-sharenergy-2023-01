import crypto from 'crypto'
import { CreateCustomer } from './create-customer'
import { CustomerProps } from '../../../domain/entities/customer'
import { customersMock } from './in-memory-customer-repository/mock/customers-mock'
import { CustomerResponse } from '../../../domain/repositorie-interfaces/customer-repository'
import { FactoryCreateCustomer } from '../factories-for-testing/factory-create-customer'

describe('use-cases/CreateCustomer', () => {
  describe('Successful tests', () => {
    it('01 - should exist CreateCustomer class', () => {
      expect(CreateCustomer).toBeDefined()
    })

    it('02 - should create and return created customer', async () => {
      const newCustomer: CustomerProps = {
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
      jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce('valid-random-uuid')
      const factoryCreateCustomer = new FactoryCreateCustomer(customersMock())
      const createCustomer = factoryCreateCustomer.execute()
      const createdCustomer = await createCustomer.create(newCustomer) as CustomerResponse
      expect(createdCustomer).toEqual({ ...newCustomer, _id: 'valid-random-uuid' })
    })
  })

  describe('Failure tests', () => {
    it('01 - should return an error if alread exists', async () => {
      const newCustomer: CustomerProps = {
        name: 'joao',
        email: 'joao@email.com',
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
      const factoryCreateCustomer = new FactoryCreateCustomer(customersMock())
      const createCustomer = factoryCreateCustomer.execute()
      const createdCustomer = await createCustomer.create(newCustomer) as Error
      expect(createdCustomer.message).toBe('customer already exists')
    })

    it('02 - should return an error if wrong cpf format', async () => {
      const newCustomer: CustomerProps = {
        name: 'daniel',
        email: 'daniel@email.com',
        cpf: 'wrongcpf',
        address: {
          city: 'serra',
          state: 'ES',
          street: 'rua das uvas',
          number: '222',
          comment: 'my comment'
        },
        phone: '27999997777'
      }
      const factoryCreateCustomer = new FactoryCreateCustomer(customersMock())
      const createCustomer = factoryCreateCustomer.execute()
      const errorCustomer = await createCustomer.create(newCustomer) as Error
      expect(errorCustomer).toBeInstanceOf(Error)
      expect(errorCustomer.message).toBe('cpf should have exactly 11 of length')
    })
  })
})
