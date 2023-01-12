import { customerResponse } from '../../../domain/entities/customer.test'
import { FactoryGetOneCustomerController } from '../factories-for-testing/factory-getone-customer-controller'
import { GetOneCustomerController } from './get-one-customer-controller'

describe('GetOneCustomerController', () => {
  describe('Sucessfull tests', () => {
    it('01 - should exist', () => {
      expect(GetOneCustomerController).toBeDefined()
    })

    it('02 - should return status 200 and customer', async () => {
      const request = {
        param: 'joao@email.com'
      }

      const createCustomerController = new FactoryGetOneCustomerController().execute()
      const response = await createCustomerController.handler(request)
      expect(response.statusCode).toEqual(200)
      expect(response.body).toEqual({ data: customerResponse })
    })
  })

  describe('Failure tests body { message: \'missing parameter: email\' }', () => {
    it('01 - should return status 400 and ', async () => {
      const request = {
        param: ''
      }

      const createCustomerController = new FactoryGetOneCustomerController().execute()
      const response = await createCustomerController.handler(request)
      expect(response.statusCode).toEqual(400)
      expect(response.body).toEqual({ message: 'missing parameter: email' })
    })

    it('01 - should return status 400 and ', async () => {
      const request = {
        param: 'joao@email.com'
      }

      const factory = new FactoryGetOneCustomerController()
      jest.spyOn(factory.getOneCustomer, 'getOne').mockResolvedValue(new Error('error for testing'))
      const createCustomerController = factory.execute()
      const response = await createCustomerController.handler(request)
      expect(response.statusCode).toEqual(404)
      expect(response.body).toEqual({ message: 'error for testing' })
    })
  })
})
