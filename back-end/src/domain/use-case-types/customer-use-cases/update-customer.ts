import { PartialCustomerProps } from '../../entities/validations/customer-validator'
import { CustomerResponse } from '../../repositorie-types/customer-repository'

export interface IUpdateCustomer {
  update: (id: string, customerProps: PartialCustomerProps) => Promise<CustomerResponse | Error >
}
