import { FactoryRemoveCustomer } from '../factories-for-testing/factory-remove-customer'
import { customersMock } from './in-memory-customer-repository/mock/customers-mock'
import { RemoveCustomer } from './remove-customer'

describe('use-cases/DeleteCustomer', () => {
  describe('Successful tests', () => {
    it('01 - should exists', () => {
      expect(RemoveCustomer).toBeDefined()
    })

    it('02 - should remove by id', async () => {
      const factoryRemoveCustomer = new FactoryRemoveCustomer(customersMock())
      const removeCustomer = factoryRemoveCustomer.execute()
      await removeCustomer.remove('uuid-2')
      const customersInRepo = factoryRemoveCustomer.customerRepository.customers
      expect(customersInRepo).toHaveLength(1)
    })
  })
})
