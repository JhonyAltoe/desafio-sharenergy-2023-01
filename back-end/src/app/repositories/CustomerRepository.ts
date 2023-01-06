import { ICustomer } from '../entities/Customer'

export interface ICustomerResponse extends ICustomer {
  id: string
}

export interface CustomerRepository {
  create: (customer: ICustomer) => Promise<ICustomerResponse>
  remove: (id: string) => void
  getById: (id: string) => Promise<ICustomerResponse>
  update: (id: string, customer: Partial<ICustomer>) => Promise<ICustomerResponse>
  getAll: () => Promise<ICustomerResponse[]>
}
