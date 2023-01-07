export interface IAddress {
  city: string
  state: string
  street: string
  number: string
  comment: string
}

export class Address {
  private readonly props: IAddress

  constructor (addressProps: IAddress) {
    this.props = addressProps
    this.validateCity()
    this.validateState()
    this.validateStreet()
  }

  private validateStreet (): void {
    if (this.street.length === 0) {
      throw new Error('street shouldn\'t be empty')
    }
  }

  private validateState (): void {
    if (this.state.length !== 2) {
      throw new Error('state should have exact 2 charaters')
    }
  }

  private validateCity (): void {
    if (this.city.length < 3) {
      throw new Error('city should have more than 2 characters')
    }
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
}
