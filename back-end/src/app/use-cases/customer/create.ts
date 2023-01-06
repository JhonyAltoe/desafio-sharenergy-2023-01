import { ICustomer } from '../../entities/Customer'
import { ICustomerResponse } from '../../repositories/CustomerRepository'

export interface ICreateCustomer {
  create: (customer: ICustomer) => Promise<ICustomerResponse>
}
