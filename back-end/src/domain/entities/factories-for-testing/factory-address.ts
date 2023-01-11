import { AddressProps, Address, IAddress } from '../address'

export class FactorytAddress {
  addressProp: AddressProps

  constructor (addressProp: AddressProps) {
    this.addressProp = addressProp
  }

  execute (): IAddress {
    return new Address(this.addressProp)
  }
}
