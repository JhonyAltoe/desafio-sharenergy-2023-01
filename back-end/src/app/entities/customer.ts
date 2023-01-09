import { EmailValidator } from '../protocols/emailValidator'
import { ICustomerRequest } from '../repositories/customer-repository'
import { Address, AddressProps, IAddress } from './address'
import { randomUUID } from 'crypto'

export interface CustomerProps {
  name: string
  email: string
  phone: string
  address: AddressProps
  cpf: string
}

export interface ICustomer {
  name: string
  email: string
  phone: string
  address: AddressProps
  cpf: string
  value: ICustomerRequest
  validate: () => Error | undefined
}

export class Customer implements ICustomer {
  private readonly _id: string
  private readonly addressInstance: IAddress
  private readonly props: CustomerProps
  private readonly emailValidator: EmailValidator

  constructor (props: CustomerProps, emailValidator: EmailValidator, id?: string) {
    this._id = id ?? randomUUID()
    this.addressInstance = new Address(props.address)
    this.props = { ...props, address: this.addressInstance.value }
    this.emailValidator = emailValidator
  }

  validate (): Error | undefined {
    const validations = [
      this.validateName(),
      this.validateEmail(this.email),
      this.validatePhone(),
      this.validateCpf(),
      this.addressInstance.validate()
    ]
    let e: Error | undefined
    for (e of validations) {
      if (e instanceof Error) {
        return e
      }
    }
  }

  private validateCpf (): Error | undefined {
    if (this.cpf.length !== 11) {
      return new Error('cpf should have exactly 11 of length')
    }
  }

  private validatePhone (): Error | undefined {
    const pattern = /^\+?[0-9]\d{1,20}$/
    if (!pattern.test(this.phone)) {
      return new Error('phone should have only numbers')
    }
  }

  private validateEmail (email: string): Error | undefined {
    if (!this.emailValidator.isValid(email)) {
      return new Error('should be a valid email')
    }
  }

  private validateName (): Error | undefined {
    if (this.name.length < 3) {
      return new Error('name should have more than 2 characteres')
    }
  }

  get id (): string {
    return this._id
  }

  get name (): string {
    return this.props.name
  }

  get email (): string {
    return this.props.email
  }

  get phone (): string {
    return this.props.phone
  }

  get address (): AddressProps {
    return this.props.address
  }

  get cpf (): string {
    return this.props.cpf
  }

  get value (): ICustomerRequest {
    return { ...this.props, id: this._id }
  }
}
