import { CustomerProps } from '../entities/customer'

interface UpdateAddressProps {
  city?: string
  state?: string
  street?: string
  number?: string
  comment?: string
}

export interface UpdateCustomerProps {
  name?: string
  email?: string
  phone?: string
  address?: UpdateAddressProps
  cpf?: string
}

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
  update: (id: string, customer: UpdateCustomerProps) => Promise<CustomerResponse | null>
  exists: (email: string) => Promise<Boolean>
}
