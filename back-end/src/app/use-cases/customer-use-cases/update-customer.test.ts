import { PartialCustomerProps } from '../../entities/validations/customer-validator'
import { CustomerResponse } from '../../repositories/customer-repository'
import { FactoryUpdateCustomer } from '../factories-for-testing/factory-update-customer'
import { customersMock } from './in-memory-customer-repository/mock/customers-mock'
import { UpdateCustomer } from './update-customer'

describe('use-cases/UpdateCustomer', () => {
  describe('Successful tests', () => {
    it('01 - should exist UpdateCustomer class', () => {
      expect(UpdateCustomer).toBeDefined()
    })

    it('02 - should return an updated customer', async () => {
      const updateCustomerProps: PartialCustomerProps = {
        email: 'joaodasilva@email.com',
        address: { state: 'vitória' }
      }

      const factoryUpdateCustomer = new FactoryUpdateCustomer(customersMock())
      const updateCustomer = factoryUpdateCustomer.execute()
      const updatedCustomer = await updateCustomer.update('uuid-1', updateCustomerProps) as CustomerResponse
      expect(updatedCustomer.email).toBe('joaodasilva@email.com')
      expect(updatedCustomer.address.state).toBe('vitória')
    })
  })
})
