import { EmailValidator } from '../../protocols/emailValidator'
import { Customer, CustomerProps, ICustomer } from '../customer'
import { CustomerValidator } from '../validations/customer-validator'
import { factoryEmailValidator } from './factory-email-validator'

export class FactoryCustomer {
  customerValidator: CustomerValidator
  props: CustomerProps
  emailValidator: EmailValidator

  constructor (props: CustomerProps) {
    this.emailValidator = factoryEmailValidator()
    this.customerValidator = new CustomerValidator(this.emailValidator)
    this.props = props
  }

  execute (): ICustomer {
    return new Customer(this.props, this.customerValidator)
  }
}
