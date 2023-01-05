import { EmailValidator } from '../protocols/emailValidator'
import { Customer, ICurstomer } from './Customer'

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
  customerProp: ICurstomer

  constructor (customerProp: ICurstomer) {
    this.emailValidator = fctEmailValidator()
    this.customerProp = customerProp
  }

  execute (): Customer {
    return new Customer(this.customerProp, this.emailValidator)
  }
}

describe('Customer', () => {
  describe('Failure tests', () => {
    it('01 - should fail when "name" has less than 3 characters', () => {
      const customerInfo = {
        name: '12',
        email: 'email_test',
        phone: 'phone_test',
        address: 'address_test',
        cpf: 'address_test'
      }
      const customer = new FctCustomer(customerInfo)
      expect(() => customer.execute()).toThrowError('Should have more than 2 characteres')
    })

    it('02 - should fail when pass invalid "email"', () => {
      const customerInfo = {
        name: 'name_test',
        email: 'invalid_email_test',
        phone: 'phone_test',
        address: 'address_test',
        cpf: 'address_test'
      }
      const customer = new FctCustomer(customerInfo)
      jest.spyOn(customer.emailValidator, 'isValid').mockReturnValueOnce(false)
      expect(() => customer.execute()).toThrowError('Should be a valid email')
    })
  })

  describe('Successful tests', () => {
    it('01 - the class Customer should exist', () => {
      const customerInfo = {
        name: 'name_test',
        email: 'email_test',
        phone: 'phone_test',
        address: 'address_test',
        cpf: 'address_test'
      }
      const customer = new FctCustomer(customerInfo)
      expect(customer).toBeTruthy()
    })
  })
})
