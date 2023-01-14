import { CustomerProps } from '../entities/customer'
import { PartialCustomerProps } from '../entities/validations/customer-validator'

export interface CustomerRequest extends CustomerProps {
  _id?: string
}

export interface CustomerResponse extends CustomerProps {
  _id: string
}

export interface CustomerRepository {
  create: (customer: CustomerRequest) => Promise<CustomerResponse>
  remove: (id: string) => Promise<void>
  getByEmail: (email: string) => Promise<CustomerResponse | null>
  update: (id: string, customer: PartialCustomerProps) => Promise<CustomerResponse | null>
  exists: (email: string) => Promise<Boolean>
  getAll: () => Promise<CustomerResponse[]>
}
