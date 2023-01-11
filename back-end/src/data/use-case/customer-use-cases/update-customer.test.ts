import { PartialCustomerProps } from '../../../domain/entities/validations/customer-validator'
import { CustomerResponse } from '../../../domain/repositorie-interfaces/customer-repository'
import { FactoryUpdateCustomer } from '../factories-for-testing/factory-update-customer'
import { customersMock } from './in-memory-customer-repository/mock/customers-mock'
import { UpdateCustomer } from './update-customer'

describe('use-cases/UpdateCustomer', () => {
  describe('Successful tests', () => {
    it('01 - should exist UpdateCustomer class', () => {
      expect(UpdateCustomer).toBeDefined()
    })

    it('02 - should return an updated customer', async () => {
      const partialCustomerProps: PartialCustomerProps = {
        email: 'joaodasilva@email.com',
        address: { state: 'MG' }
      }

      const factoryUpdateCustomer = new FactoryUpdateCustomer(customersMock())
      const updateCustomer = factoryUpdateCustomer.execute()
      const updatedCustomer = await updateCustomer.update('uuid-1', partialCustomerProps) as CustomerResponse
      expect(updatedCustomer.email).toBe('joaodasilva@email.com')
      expect(updatedCustomer.address.state).toBe('MG')
    })
  })

  describe('Failure tests', () => {
    it('01 - should fail when partialCustomerProps is invalid', async () => {
      const partialCustomerProps: PartialCustomerProps = {
        email: 'joaodasilva@email.com',
        address: { state: 'invalid_state' }
      }

      const factoryUpdateCustomer = new FactoryUpdateCustomer(customersMock())
      const updateCustomer = factoryUpdateCustomer.execute()
      const error = await updateCustomer.update('uuid-1', partialCustomerProps) as Error
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('state should have exact 2 charaters')
    })
  })
})
