import { Customer } from './Customer'

describe('Customer', () => {
  it('01 - the class Customer should exist', () => {
    const customer = new Customer({
      name: 'name_test',
      email: 'email_test',
      phone: 'phone_test',
      address: 'address_test',
      cpf: 'address_test'
    })
    expect(customer).toBeTruthy()
  })

  it('02 - name should have more than 3 characteres', () => {
    const customer = (): Customer => new Customer({
      name: '12',
      email: 'email_test',
      phone: 'phone_test',
      address: 'address_test',
      cpf: 'address_test'
    })

    expect(customer).toThrowError()
  })
})
