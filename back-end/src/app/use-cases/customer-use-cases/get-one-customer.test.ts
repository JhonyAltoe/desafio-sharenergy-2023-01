import { GetOneCustomer } from './get-one-customer'
import { FactoryGetOneCustomer } from '../factories-for-testing/factory-get-one-customer'
import { customersMock } from './in-memory-customer-repository/mock/customers-mock'
import { CustomerResponse } from '../../repositories/customer-repository'

describe('use-cases/GetOneCustomer', () => {
  describe('Successful tests', () => {
    it('01 - should exist GetOneCustomer class', () => {
      expect(GetOneCustomer).toBeDefined()
    })

    it('02 - should get one customer by email', async () => {
      const factoryGetOneCustomer = new FactoryGetOneCustomer(customersMock())
      const getOneCustomer = factoryGetOneCustomer.execute()
      const customer = await getOneCustomer.getOne('joao@email.com') as CustomerResponse
      expect(customer.email).toBe('joao@email.com')
    })
  })

  describe('Failure tests', () => {
    it('01 - should fail one when email don\'t exists', async () => {
      const factoryGetOneCustomer = new FactoryGetOneCustomer(customersMock())
      const getOneCustomer = factoryGetOneCustomer.execute()
      const customer = await getOneCustomer.getOne('donotexists@email.com') as Error
      expect(customer).toBeInstanceOf(Error)
      expect(customer.message).toBe('customer do not exist in database')
    })
  })
})
