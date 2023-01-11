import { addressValidInfo } from '../address.test'
import { AddressValidator } from './address-validator'

describe('', () => {
  describe('Failure tests', () => {
    it('01 - should fail length city less than 3', () => {
      const cityLength2 = { ...addressValidInfo, city: 'ab' }
      const error = new AddressValidator().validateAddress(cityLength2)
      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toEqual('city should have more than 2 characters')
    })

    it('02 - should fail when state different of 2 characters', () => {
      const stateLength1 = { ...addressValidInfo, state: 'a' }
      const stateLength3 = { ...addressValidInfo, state: 'abc' }
      const errorLenth1 = new AddressValidator().validateAddress(stateLength1)
      const errorLenth3 = new AddressValidator().validateAddress(stateLength3)
      expect(errorLenth1).toBeInstanceOf(Error)
      expect(errorLenth3).toBeInstanceOf(Error)
      expect(errorLenth1?.message).toEqual('state should have exact 2 charaters')
      expect(errorLenth3?.message).toEqual('state should have exact 2 charaters')
    })

    it('03 - should fail when street is empty', () => {
      const streetEmpty = { ...addressValidInfo, street: '' }
      const error = new AddressValidator().validateAddress(streetEmpty)
      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toEqual('street shouldn\'t be empty')
    })
  })
})
