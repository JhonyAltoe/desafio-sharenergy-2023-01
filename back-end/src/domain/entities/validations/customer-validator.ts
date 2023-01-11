import { EmailValidator } from '../../protocols/emailValidator'
import { AddressValidator, PartialAddressProps } from './address-validator'

export interface PartialCustomerProps {
  name?: string
  email?: string
  phone?: string
  address?: PartialAddressProps
  cpf?: string
}

export interface ICustomerValidator {
  validateCustomer: (partialProps: PartialCustomerProps) => Error | undefined
}

export class CustomerValidator extends AddressValidator implements ICustomerValidator {
  emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    super()
    this.emailValidator = emailValidator
  }

  validateCustomer (partialProps: PartialCustomerProps): Error | undefined {
    const validations = [
      this.validateCpf(partialProps.cpf),
      this.validatePhone(partialProps.phone),
      this.validateEmail(partialProps.email),
      this.validateName(partialProps.name),
      super.validateAddress(partialProps.address)
    ]

    let e: Error | undefined
    for (e of validations) {
      if (e instanceof Error) {
        return e
      }
    }
  }

  private validateCpf (cpf: string | undefined): Error | undefined {
    if (cpf === undefined) return
    if (cpf.length !== 11) {
      return new Error('cpf should have exactly 11 of length')
    }
  }

  private validatePhone (phone: string | undefined): Error | undefined {
    if (phone === undefined) return
    const pattern = /^\+?[0-9]\d{1,20}$/
    if (!pattern.test(phone)) {
      return new Error('phone should have only numbers')
    }
  }

  private validateEmail (email: string | undefined): Error | undefined {
    if (email === undefined) return
    if (!this.emailValidator.isValid(email)) {
      return new Error('should be a valid email')
    }
  }

  private validateName (name: string | undefined): Error | undefined {
    if (name === undefined) return
    if (name.length < 3) {
      return new Error('name should have more than 2 characteres')
    }
  }
}
