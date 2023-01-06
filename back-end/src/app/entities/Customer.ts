import { EmailValidator } from '../protocols/emailValidator'
import { IAddress } from './Address'
import { randomUUID } from 'crypto'

export interface ICustomer {
  name: string
  email: string
  phone: string
  address: IAddress
  cpf: string
}

export class Customer {
  private readonly _id: string
  private readonly props: ICustomer
  private readonly emailValidator: EmailValidator

  constructor (props: ICustomer, emailValidator: EmailValidator, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props
    this.emailValidator = emailValidator
    this.validateName()
    this.validateEmail(this.email)
    this.validatePhone()
    this.validateCpf()
  }

  validateCpf (): void {
    if (this.cpf.length !== 11) {
      throw new Error('cpf should have exactly 11 of length')
    }
  }

  validatePhone (): void {
    const pattern = /^\+?[0-9]\d{1,20}$/
    if (!pattern.test(this.phone)) {
      throw new Error('Should have only numbers')
    }
  }

  validateEmail (email: string): void {
    if (!this.emailValidator.isValid(email)) {
      throw new Error('Should be a valid email')
    }
  }

  validateName (): void {
    if (this.name.length < 3) {
      throw new Error('Should have more than 2 characteres')
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

  get address (): IAddress {
    return this.props.address
  }

  get cpf (): string {
    return this.props.cpf
  }
}
