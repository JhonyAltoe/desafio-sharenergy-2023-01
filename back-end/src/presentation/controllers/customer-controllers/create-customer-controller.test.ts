import { customersMock } from '../../../data/use-cases/customer-use-cases/in-memory-customer-repository/mock/customers-mock'
import { AddressProps } from '../../../domain/entities/address'
import { CustomerProps } from '../../../domain/entities/customer'
import { CustomerResponse } from '../../../domain/repositorie-interfaces/customer-repository'
import { FactoryCreateCustomerController } from '../factories-for-testing/factory-create-customer-controller'
import { CreateCustomerController } from './create-customer-controller'
import crypto from 'crypto'

const addressValidInfo: AddressProps = {
  city: 'valid_city',
  state: 'VS',
  street: 'valid_street',
  number: '22',
  comment: 'valid_comment'
}

const customerValidInfo: CustomerProps = {
  name: 'valid_name',
  email: 'valid@email.com',
  phone: '5527900000000',
  address: addressValidInfo,
  cpf: '99999999999'
}

const customerResponseMock: CustomerResponse = {
  ...customerValidInfo,
  id: 'valid-random-uuid'
}

describe('CreateCustomerController', () => {
  describe('Sucessfull tests', () => {
    it('01 - should exist', () => {
      expect(CreateCustomerController).toBeDefined()
    })

    it('02 - should return status 200 and customer', async () => {
      const request = {
        body: customerValidInfo
      }

      const createCustomerController = new FactoryCreateCustomerController(customersMock()).execute()
      jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce('valid-random-uuid')
      const customerResponse = await createCustomerController.handler(request)
      console.log(customerResponse)
      expect(customerResponse.statusCode).toEqual(200)
      expect(customerResponse.body).toEqual({ data: customerResponseMock })
    })
  })

  describe('Failure tests', () => {
    it('01 - should return status 400 with body { message: \'missing parameter: name\' }', async () => {
      const request = {
        body: { ...customerValidInfo, name: '' }
      }

      const createCustomerController = new FactoryCreateCustomerController(customersMock()).execute()
      const badRequestError = await createCustomerController.handler(request)
      expect(badRequestError.statusCode).toEqual(400)
      expect(badRequestError.body).toEqual({ message: 'missing parameter: name' })
    })

    it('02 - should return status 400 with body { message: \'missing parameter: cpf\' }', async () => {
      const request = {
        body: {
          ...customerValidInfo,
          address: {
            ...addressValidInfo,
            number: '',
            comment: ''
          },
          cpf: ''
        }
      }

      const createCustomerController = new FactoryCreateCustomerController(customersMock()).execute()
      const badRequestError = await createCustomerController.handler(request)
      expect(badRequestError.statusCode).toEqual(400)
      expect(badRequestError.body).toEqual({ message: 'missing parameter: cpf' })
    })
  })
})
