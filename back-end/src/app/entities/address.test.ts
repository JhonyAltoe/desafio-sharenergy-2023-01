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
