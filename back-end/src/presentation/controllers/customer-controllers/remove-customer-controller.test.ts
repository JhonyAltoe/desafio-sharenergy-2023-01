import { HttpRequest } from '../../protocols/http'
import { FactoryRemoveCustomerController } from '../factories-for-testing/factory-remove-customer-controller'
import { RemoveCustomerController } from './remove-customer-controller'

describe('RemoveCustomerController', () => {
  describe('Sucessfull tests', () => {
    it('01 - should exist', () => {
      expect(RemoveCustomerController).toBeDefined()
    })

    it('02 - should return status 200', async () => {
      const request: HttpRequest = {
        param: 'valid-UUID'
      }

      const removeCustomerController = new FactoryRemoveCustomerController().execute()
      const response = await removeCustomerController.handler(request)
      expect(response.statusCode).toBe(200)
    })
  })

  describe('Failure tests', () => {
    it('01 - should return statusCode 400 and body { message: \'missing parameter: id\' }', async () => {
      const request: HttpRequest = {
        param: ''
      }

      const removeCustomerController = new FactoryRemoveCustomerController().execute()
      const response = await removeCustomerController.handler(request)
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({ message: 'missing parameter: id' })
    })
  })
})
