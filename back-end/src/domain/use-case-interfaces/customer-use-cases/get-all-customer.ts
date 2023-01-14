import { CustomerResponse } from '../../repositorie-interfaces/customer-repository'

export interface IGetAllCustomer {
  getAll: () => Promise<CustomerResponse[]>
}
