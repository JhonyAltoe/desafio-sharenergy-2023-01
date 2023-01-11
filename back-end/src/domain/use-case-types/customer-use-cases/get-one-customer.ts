import { CustomerResponse } from '../../repositorie-types/customer-repository'

export interface IGetOneCustomer {
  getOne: (email: string) => Promise<CustomerResponse | Error >
}
