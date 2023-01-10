import { Address, AddressProps } from './address'
import { FactorytAddress } from './factories-for-testing/factory-address'

export const addressValidInfo: AddressProps = {
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
      const address = new FactorytAddress(cityLength2).execute()
      expect(address.validate()).toBeInstanceOf(Error)
      expect(address.validate()?.message).toEqual('city should have more than 2 characters')
    })

    it('02 - should fail when state different of 2 characters', () => {
      const stateLength1 = { ...addressValidInfo, state: 'a' }
      const stateLength3 = { ...addressValidInfo, state: 'abc' }
      const addressWithStateLenth1 = new FactorytAddress(stateLength1).execute()
      const addressWithStateLenth3 = new FactorytAddress(stateLength3).execute()
      expect(addressWithStateLenth1.validate()).toBeInstanceOf(Error)
      expect(addressWithStateLenth3.validate()).toBeInstanceOf(Error)
      expect(addressWithStateLenth1.validate()?.message).toEqual('state should have exact 2 charaters')
      expect(addressWithStateLenth3.validate()?.message).toEqual('state should have exact 2 charaters')
    })

    it('03 - should fail when street is empty', () => {
      const streetEmpty = { ...addressValidInfo, street: '' }
      const address = new FactorytAddress(streetEmpty).execute()
      expect(address.validate()).toBeInstanceOf(Error)
      expect(address.validate()?.message).toEqual('street shouldn\'t be empty')
    })
  })

  describe('Successful tests', () => {
    it('01 - the class Address should exist', () => {
      expect(Address).toBeDefined()
    })

    it('02 - should pass when receive valid address', () => {
      const addressProps = { ...addressValidInfo }
      const address = new FactorytAddress(addressProps)
      expect(address.execute()).toBeTruthy()
    })

    it('03 - should return full address', () => {
      const addressProps = { ...addressValidInfo }
      const factoryAddress = new FactorytAddress(addressProps)
      const address = factoryAddress.execute()
      expect(address.value).toEqual(addressValidInfo)
    })
  })
})
