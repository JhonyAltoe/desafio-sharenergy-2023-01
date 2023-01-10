import { CustomerProps } from '../../entities/customer'
import { CustomerResponse } from '../../repositories/customer-repository'

export interface IUpdateCustomer {
  update: (id: string, customerProps: Partial<CustomerProps>) => Promise<CustomerResponse | Error >
}

export class UpdateCustomer implements IUpdateCustomer {
  update: (id: string, customerProps: Partial<CustomerProps>) => Promise<CustomerResponse | Error>
}
