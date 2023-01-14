import { HttpRequest } from '../../protocols/http'
import { FactoryUpdateCustomerController, customerResponse } from '../factories-for-testing/factory-update-customer-controller'
import { UpdateCustomerController } from './update-customer-controller'

describe('UpdateCustomerController', () => {
  describe('Sucessful tests', () => {
    it('01 - should exists', () => {
      expect(UpdateCustomerController).toBeDefined()
    })

    it('02 - should return statusCode 200 and updated customer', async () => {
      const request: HttpRequest = {
        body: {
          email: 'joaodasilva@email.com',
          address: { state: 'MG' }
        },
        param: {
          id: 'valid-random-uuid'
        }
      }

      const controller = new FactoryUpdateCustomerController().execute()
      const response = await controller.handler(request)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({ data: customerResponse })
    })
  })

  describe('Failure tests', () => {
    it('01 - should return statusCode 400 and body { message: \'missing parameter: id\' }', async () => {
      const request: HttpRequest = {
        body: {
          email: 'joaodasilva@email.com',
          address: { state: 'MG' }
        },
        param: {}
      }

      const controller = new FactoryUpdateCustomerController().execute()
      const response = await controller.handler(request)
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({ message: 'missing parameter: id' })
    })

    it('02 - should return statusCode 400 and body { message: \'missing parameter: body\' }', async () => {
      const request2: HttpRequest = {
        body: {},
        param: {
          id: 'valid-random-uuid'
        }
      }

      const controller = new FactoryUpdateCustomerController().execute()
      const response = await controller.handler(request2)
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({ message: 'missing parameter: body' })
    })
  })
})
