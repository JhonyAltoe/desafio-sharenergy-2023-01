import { EmailValidator } from '../../protocols/emailValidator'
import { Customer, CustomerProps, ICustomer } from '../customer'
import { factoryEmailValidator } from './factory-email-validator'

export class FactoryCustomer {
  emailValidator: EmailValidator
  customerProp: CustomerProps

  constructor (customerProp: CustomerProps) {
    this.emailValidator = factoryEmailValidator()
    this.customerProp = customerProp
  }

  execute (): ICustomer {
    return new Customer(this.customerProp, this.emailValidator)
  }
}
