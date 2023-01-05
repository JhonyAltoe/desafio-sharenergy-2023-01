import { Address, IAddress } from './Address'

export const addressValidInfo: IAddress = {
  city: 'valid_city',
  state: 'valid_state',
  street: 'valid_street',
  number: '22',
  comment: 'valid_comment'
}

describe('Address', () => {
  describe('Successful tests', () => {
    it('01 - the class Address should exist', () => {
      expect(Address).toBeDefined()
    })
  })
})
