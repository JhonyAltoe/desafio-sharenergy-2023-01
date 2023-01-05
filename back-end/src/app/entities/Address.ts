export interface IAddress {
  city: string
  state: string
  street: string
  number: string
  comment: string
}

export class Address {
  private readonly addressProps: IAddress

  constructor (addressProps: IAddress) {
    this.addressProps = addressProps
  }
}
