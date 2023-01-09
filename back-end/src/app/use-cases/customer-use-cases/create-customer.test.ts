import { CustomerProps } from '../../entities/customer'
import { fctEmailValidator } from '../../entities/customer.test'
import { EmailValidator } from '../../protocols/emailValidator'
import { ICustomerResponse } from '../../repositories/customer-repository'
import { CreateCustomer, ICreateCustomer } from './create-customer'
import { InMemoryCustomerRepository } from './in-memory-customer-repository/in-memory-customer-repository'
import { customersMock } from './in-memory-customer-repository/mock/customers-mock'

class FctCreateCustomer {
  customerRepository: InMemoryCustomerRepository
  emailValidator: EmailValidator

  constructor (dbCustomersMock: ICustomerResponse[]) {
    this.customerRepository = new InMemoryCustomerRepository(dbCustomersMock)
    this.emailValidator = fctEmailValidator()
  }

  execute (): ICreateCustomer {
    return new CreateCustomer(this.customerRepository, this.emailValidator)
  }
}

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
      const fctCreateCustomer = new FctCreateCustomer(customersMock())
      const createCustomer = fctCreateCustomer.execute()
      const createdCustomer = await createCustomer.create(newCustomer) as ICustomerResponse
      expect(createdCustomer).toEqual({ ...newCustomer, id: 'testUUID' })
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
      const fctCreateCustomer = new FctCreateCustomer(customersMock())
      const createCustomer = fctCreateCustomer.execute()
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
      const fctCreateCustomer = new FctCreateCustomer(customersMock())
      const createCustomer = fctCreateCustomer.execute()
      const errorCustomer = await createCustomer.create(newCustomer) as Error
      expect(errorCustomer).toBeInstanceOf(Error)
    })
  })
})
