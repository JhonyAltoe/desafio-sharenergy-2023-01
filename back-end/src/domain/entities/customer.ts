import { CustomerRequest } from '../repositorie-interfaces/customer-repository'
import { Address, AddressProps } from './address'
import { randomUUID } from 'crypto'
import { ICustomerValidator } from './validations/customer-validator'

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
  value: CustomerRequest
  validateCustomer: () => Error | undefined
}

export class Customer implements ICustomer {
  private readonly _id: string
  private readonly props: CustomerProps
  private readonly customerValidator: ICustomerValidator

  constructor (props: CustomerProps, customerValidator: ICustomerValidator, id?: string) {
    this._id = id ?? randomUUID()
    this.props = { ...props, address: new Address(props.address).value }
    this.customerValidator = customerValidator
  }

  validateCustomer (): Error | undefined {
    return this.customerValidator.validateCustomer(this.props)
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

  get value (): CustomerRequest {
    return { ...this.props, id: this._id }
  }
}
