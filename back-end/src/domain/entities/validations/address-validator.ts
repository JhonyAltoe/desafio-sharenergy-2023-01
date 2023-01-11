export interface PartialAddressProps {
  city?: string
  state?: string
  street?: string
  number?: string
  comment?: string
}

export interface IAddresValidator {
  validateAddress: (partialProps: PartialAddressProps | undefined) => Error | undefined
}

export class AddressValidator implements IAddresValidator {
  validateAddress (partialProps: PartialAddressProps | undefined): Error | undefined {
    if (partialProps === undefined) return
    const validations = [
      this.validateCity(partialProps.city),
      this.validateState(partialProps.state),
      this.validateStreet(partialProps.street)
    ]

    let e: Error | undefined
    for (e of validations) {
      if (e instanceof Error) {
        return e
      }
    }
  }

  private validateStreet (street: string | undefined): Error | undefined {
    if (street === undefined) return
    if (street.length === 0) {
      return new Error('street shouldn\'t be empty')
    }
  }

  private validateState (state: string | undefined): Error | undefined {
    if (state === undefined) return
    if (state.length !== 2) {
      return new Error('state should have exact 2 charaters')
    }
  }

  private validateCity (city: string | undefined): Error | undefined {
    if (city === undefined) return
    if (city.length < 3) {
      return new Error('city should have more than 2 characters')
    }
  }
}
