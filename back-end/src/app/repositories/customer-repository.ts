import { CustomerProps } from '../entities/customer'

export interface ICustomerResponse extends CustomerProps {
  id: string
}

export interface CustomerRepository {
  create: (customer: CustomerProps) => Promise<ICustomerResponse>
  remove: (id: string) => void
  getById: (id: string) => Promise<ICustomerResponse>
  update: (id: string, customer: Partial<CustomerProps>) => Promise<ICustomerResponse>
  getAll: () => Promise<ICustomerResponse[]>
}
