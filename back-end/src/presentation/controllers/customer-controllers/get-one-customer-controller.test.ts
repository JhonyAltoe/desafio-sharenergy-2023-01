import { FactoryGetOneCustomerController } from '../factories-for-testing/factory-getone-customer-controller'
import { GetOneCustomerController } from './get-one-customer-controller'

describe('GetOneCustomerController', () => {
  describe('Sucessfull tests', () => {
    it('01 - should exist', () => {
      expect(GetOneCustomerController).toBeDefined()
    })

    it('02 - should return status 200 and customer', async () => {
      const request = {
        param: ''
      }

      const createCustomerController = new FactoryGetOneCustomerController().execute()
      const response = await createCustomerController.handler(request)
      expect(response.statusCode).toEqual(400)
      expect(response.body).toEqual({ message: 'missing parameter: email' })
    })
  })
})
