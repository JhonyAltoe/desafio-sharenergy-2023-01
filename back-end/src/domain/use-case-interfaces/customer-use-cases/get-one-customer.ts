import { CustomerResponse } from '../../repositorie-interfaces/customer-repository'

export interface IGetOneCustomer {
  getOne: (email: string) => Promise<CustomerResponse | Error >
}
