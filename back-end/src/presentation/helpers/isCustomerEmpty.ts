import { CustomerProps } from '../../domain/entities/customer'
import { MissingParamError } from '../errors/missing-param-error'

const customerKeys = ['name', 'email', 'phone', 'address', 'cpf']
const addressKeys = ['city', 'state', 'street', 'number', 'comment']

enum obj {
  number = 'number',
  comment = 'comment'
}

export function isCustomerEmpty (customer: CustomerProps): MissingParamError | null {
  for (let i = 0; i < customerKeys.length; i++) {
    if (customer[customerKeys[i]] === (undefined ?? '')) {
      return new MissingParamError(customerKeys[i])
    }
  }

  for (let i = 0; i < addressKeys.length; i++) {
    if ((addressKeys[i] === obj[addressKeys[i]]) && (customer.address[addressKeys[i]] === '')) {
      continue
    }

    if (customer.address[addressKeys[i]] === (undefined ?? '')) {
      return new MissingParamError(addressKeys[i])
    }
  }

  return null
}
