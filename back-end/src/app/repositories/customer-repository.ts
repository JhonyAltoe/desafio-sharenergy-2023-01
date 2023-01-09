import { CustomerProps } from '../entities/customer'

export interface CustomerRequest extends CustomerProps {
  id?: string
}

export interface CustomerResponse extends CustomerProps {
  id: string
}

export interface CustomerRepository {
  create: (customer: CustomerRequest) => Promise<CustomerResponse>
  remove: (id: string) => Promise<void>
  getByEmail: (email: string) => Promise<CustomerResponse | null>
  update: (id: string, customer: Partial<CustomerRequest>) => Promise<CustomerResponse | null>
  exists: (email: string) => Promise<Boolean>
}
