import { CustomerProps } from '../../entities/customer'
import { CustomerResponse } from '../../repositorie-types/customer-repository'

export interface ICreateCustomer {
  create: (newCustomer: CustomerProps) => Promise<CustomerResponse | Error>
}
