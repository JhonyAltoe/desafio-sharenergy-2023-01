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
  state: 'VS',
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

    it('02 - should fail when state different of 2 characters', () => {
      const stateLength1 = { ...addressValidInfo, state: 'a' }
      const stateLength3 = { ...addressValidInfo, state: 'abc' }
      const addressWithStateLenth1 = new FctAddress(stateLength1)
      const addressWithStateLenth3 = new FctAddress(stateLength3)
      expect(() => addressWithStateLenth1.execute()).toThrowError('city should have exact 2 charaters')
      expect(() => addressWithStateLenth3.execute()).toThrowError('city should have exact 2 charaters')
    })

    it('03 - should fail when street is empty', () => {
      const streetEmpty = { ...addressValidInfo, street: '' }
      const address = new FctAddress(streetEmpty)
      expect(() => address.execute()).toThrowError('street shouldn\'t be empty')
    })
  })

  describe('Successful tests', () => {
    it('01 - the class Address should exist', () => {
      expect(Address).toBeDefined()
    })

    it('02 - should pass when receive valid address', () => {
      const addressProps = { ...addressValidInfo }
      const address = new FctAddress(addressProps)
      expect(address).toBeTruthy()
    })
  })
})
