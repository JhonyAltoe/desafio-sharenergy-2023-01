import { EmailValidator } from '../protocols/emailValidator'
import { ICustomerResponse } from '../repositories/CustomerRepository'
import { Address } from './Address'
import { Customer, ICustomer } from './Customer'
import { addressValidInfo } from './address.test'
import crypto from 'crypto'

const fctEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (_email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  return emailValidatorStub
}

class FctCustomer {
  emailValidator: EmailValidator
  customerProp: ICustomer

  constructor (customerProp: ICustomer) {
    this.emailValidator = fctEmailValidator()
    this.customerProp = customerProp
  }

  execute (): Customer {
    return new Customer(this.customerProp, this.emailValidator)
  }
}

const customerValidInfo: ICustomer = {
  name: 'valid_name',
  email: 'valid@email.com',
  phone: '5527900000000',
  address: new Address(addressValidInfo),
  cpf: '99999999999'
}

const customerResponse: ICustomerResponse = {
  ...customerValidInfo,
  id: 'valid-random-uuid'
}

describe('Customer', () => {
  describe('Failure tests', () => {
    it('01 - should fail when "name" has less than 3 characters', () => {
      const customerInfo = { ...customerValidInfo, name: 'ab' }
      const customer = new FctCustomer(customerInfo)
      expect(() => customer.execute()).toThrowError('Should have more than 2 characteres')
    })

    it('02 - should fail when pass invalid "email"', () => {
      const customerInfo = { ...customerValidInfo, email: 'invalid_email' }
      const customer = new FctCustomer(customerInfo)
      jest.spyOn(customer.emailValidator, 'isValid').mockReturnValueOnce(false)
      expect(() => customer.execute()).toThrowError('Should be a valid email')
    })

    it('03 - should fail when pass an invalid "phone"', () => {
      const customerInfo = { ...customerValidInfo, phone: 'invalid_phone' }
      const customer = new FctCustomer(customerInfo)
      expect(() => customer.execute()).toThrowError('Should have only numbers')
    })

    it('04 - should fail when "cpf" has different than 11 length', () => {
      const cpfLength10 = { ...customerValidInfo, cpf: '9999999999' }
      const cpfLength12 = { ...customerValidInfo, cpf: '999999999999' }
      const customerLength10 = new FctCustomer(cpfLength10)
      const customerLength12 = new FctCustomer(cpfLength12)
      expect(() => customerLength10.execute()).toThrowError('cpf should have exactly 11 of length')
      expect(() => customerLength12.execute()).toThrowError('cpf should have exactly 11 of length')
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
