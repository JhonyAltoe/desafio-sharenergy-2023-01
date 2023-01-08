import { CustomerProps } from '../entities/customer'

export interface ICustomerPersistence extends CustomerProps {
  id?: string
}

export interface ICustomerResponse extends CustomerProps {
  id: string
}

export interface CustomerRepository {
  create: (customer: ICustomerPersistence) => Promise<ICustomerResponse>
  remove: (id: string) => Promise<void>
  getByEmail: (email: string) => Promise<ICustomerResponse | null>
  update: (id: string, customer: Partial<ICustomerPersistence>) => Promise<ICustomerResponse>
}
