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
  }

  validate (): Error | undefined {
    const validations = [
      this.validateCity(),
      this.validateState(),
      this.validateStreet()
    ]
    let e: Error | undefined
    for (e of validations) {
      if (e instanceof Error) {
        return e
      }
    }
  }

  private validateStreet (): Error | undefined {
    if (this.street.length === 0) {
      return new Error('street shouldn\'t be empty')
    }
  }

  private validateState (): Error | undefined {
    if (this.state.length !== 2) {
      return new Error('state should have exact 2 charaters')
    }
  }

  private validateCity (): Error | undefined {
    if (this.city.length < 3) {
      return new Error('city should have more than 2 characters')
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

  get value (): IAddress {
    return { ...this.props }
  }
}
