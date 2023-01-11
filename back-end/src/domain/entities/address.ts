export interface AddressProps {
  city: string
  state: string
  street: string
  number: string
  comment: string
}

export interface IAddress {
  city: string
  state: string
  street: string
  number: string
  comment: string
  value: AddressProps
}

export class Address implements IAddress {
  private readonly props: AddressProps

  constructor (addressProps: AddressProps) {
    this.props = addressProps
  }

  get city (): string {
    return this.props.city
  }

  get state (): string {
    return this.props.state
  }

  get street (): string {
    return this.props.street
  }

  get number (): string {
    return this.props.number
  }

  get comment (): string {
    return this.props.comment
  }

  get value (): AddressProps {
    return { ...this.props }
  }
}
