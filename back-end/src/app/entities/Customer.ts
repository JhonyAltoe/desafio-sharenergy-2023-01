import { EmailValidator } from '../protocols/emailValidator'
import { ICustomerResponse } from '../repositories/CustomerRepository'
import { IAddress } from './Address'
import { randomUUID } from 'crypto'

export interface CustomerProps {
  name: string
  email: string
  phone: string
  address: IAddress
  cpf: string
}

export class Customer {
  private readonly _id: string
  private readonly props: CustomerProps
  private readonly emailValidator: EmailValidator

  constructor (props: CustomerProps, emailValidator: EmailValidator, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props
    this.emailValidator = emailValidator
    this.validateName()
    this.validateEmail(this.email)
    this.validatePhone()
    this.validateCpf()
  }

  private validateCpf (): void {
    if (this.cpf.length !== 11) {
      throw new Error('cpf should have exactly 11 of length')
    }
  }

  private validatePhone (): void {
    const pattern = /^\+?[0-9]\d{1,20}$/
    if (!pattern.test(this.phone)) {
      throw new Error('phone should have only numbers')
    }
  }

  private validateEmail (email: string): void {
    if (!this.emailValidator.isValid(email)) {
      throw new Error('Should be a valid email')
    }
  }

  private validateName (): void {
    if (this.name.length < 3) {
      throw new Error('name should have more than 2 characteres')
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

  get value (): ICustomerResponse {
    return { ...this.props, id: this._id }
  }
}
