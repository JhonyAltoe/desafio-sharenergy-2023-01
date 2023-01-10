import { EmailValidator } from '../protocols/emailValidator'
import { CustomerResponse } from '../repositories/customer-repository'
import { Customer, CustomerProps } from './customer'
import { addressValidInfo } from './address.test'
import { factoryEmailValidator } from './factories-for-testing/factory-email-validator'
import crypto from 'crypto'

export class FctCustomer {
  emailValidator: EmailValidator
  customerProp: CustomerProps

  constructor (customerProp: CustomerProps) {
    this.emailValidator = factoryEmailValidator()
    this.customerProp = customerProp
  }

  execute (): Customer {
    return new Customer(this.customerProp, this.emailValidator)
  }
}

const customerValidInfo: CustomerProps = {
  name: 'valid_name',
  email: 'valid@email.com',
  phone: '5527900000000',
  address: addressValidInfo,
  cpf: '99999999999'
}

const customerResponse: CustomerResponse = {
  ...customerValidInfo,
  id: 'valid-random-uuid'
}

describe('Customer', () => {
  describe('Failure tests', () => {
    it('01 - should fail when "name" has less than 3 characters', () => {
      const customerInfo = { ...customerValidInfo, name: 'ab' }
      const customer = new FctCustomer(customerInfo).execute()
      expect(customer.validate()).toBeInstanceOf(Error)
      expect(customer.validate()?.message).toBe('name should have more than 2 characteres')
    })

    it('02 - should fail when pass invalid "email"', () => {
      const customerInfo = { ...customerValidInfo, email: 'invalid_email' }
      const fctCustomer = new FctCustomer(customerInfo)
      jest.spyOn(fctCustomer.emailValidator, 'isValid').mockReturnValueOnce(false)
      const customer = fctCustomer.execute()
      const error = customer.validate()
      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toBe('should be a valid email')
    })

    it('03 - should fail when pass an invalid "phone"', () => {
      const customerInfo = { ...customerValidInfo, phone: 'invalid_phone' }
      const customer = new FctCustomer(customerInfo).execute()
      const error = customer.validate()
      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toBe('phone should have only numbers')
    })

    it('04 - should fail when "cpf" has different than 11 length', () => {
      const cpfLength10 = { ...customerValidInfo, cpf: '9999999999' }
      const cpfLength12 = { ...customerValidInfo, cpf: '999999999999' }
      const customerLength10 = new FctCustomer(cpfLength10).execute()
      const customerLength12 = new FctCustomer(cpfLength12).execute()
      const error10 = customerLength10.validate()
      const error12 = customerLength12.validate()
      expect(error10).toBeInstanceOf(Error)
      expect(error12).toBeInstanceOf(Error)
      expect(error10?.message).toBe('cpf should have exactly 11 of length')
      expect(error12?.message).toBe('cpf should have exactly 11 of length')
    })
  })

  describe('Successful tests', () => {
    it('01 - the class Customer should exist', () => {
      const customer = new FctCustomer(customerValidInfo)
      expect(customer).toBeDefined()
    })

    it('02 - should not throw error when pass a valid customer', () => {
      const customer = new FctCustomer(customerValidInfo)
      expect(() => customer.execute()).not.toThrowError()
    })

    it('03 - should return a customer object', () => {
      const fctCustomer = new FctCustomer(customerValidInfo)
      jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce('valid-random-uuid')
      const customer = fctCustomer.execute()
      expect(customer.value).toEqual(customerResponse)
    })
  })
})
