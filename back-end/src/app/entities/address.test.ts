import { Address, IAddress } from './Address'

class FctAddress {
  addressProp: IAddress

  constructor (addressProp: IAddress) {
    this.addressProp = addressProp
  }

  execute (): Address {
    return new Address(this.addressProp)
  }
}

export const addressValidInfo: IAddress = {
  city: 'valid_city',
  state: 'valid_state',
  street: 'valid_street',
  number: '22',
  comment: 'valid_comment'
}

describe('Address', () => {
  describe('Failure tests', () => {
    it('01 - should fail length city less than 3', () => {
      const cityLength2 = { ...addressValidInfo, city: 'ab' }
      const address = new FctAddress(cityLength2)
      expect(() => address.execute()).toThrowError('city should have more than 2 characters')
    })
  })

  describe('Successful tests', () => {
    it('01 - the class Address should exist', () => {
      expect(Address).toBeDefined()
    })
  })
})
