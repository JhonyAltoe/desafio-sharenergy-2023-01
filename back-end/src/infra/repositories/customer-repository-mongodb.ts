import { PartialCustomerProps } from '../../domain/entities/validations/customer-validator'
import { CustomerRepository, CustomerRequest, CustomerResponse } from '../../domain/repositorie-interfaces/customer-repository'
import { model as mongooseCreateModel } from 'mongoose'
import { customerMongooseSchema } from './customer'

export class CustomerRepositoryMongodb implements CustomerRepository {
  constructor (
    private readonly model = mongooseCreateModel('customers', customerMongooseSchema)
  ) {}

  async create (customer: CustomerRequest): Promise<CustomerResponse> {
    const newCustomer = await this.model.create(customer)
    return await newCustomer.toObject()
  }

  async remove (id: string): Promise<void> {
    await this.model.findOneAndRemove({ id })
  }

  async getByEmail (email: string): Promise<CustomerResponse | null> {
    const customer = await this.model.findOne({ email })
    if (customer === (undefined ?? null)) {
      return null
    }
    return await customer.toObject()
  }

  async update (id: string, customer: PartialCustomerProps): Promise<CustomerResponse | null> {
    const updated = await this.model.findByIdAndUpdate({ _id: id }, { ...customer }, { new: true })
    if (updated === (undefined ?? null)) {
      return null
    }
    return await updated.toObject()
  }

  async exists (email: string): Promise<Boolean> {
    const bool = await this.model.exists({ email })
    if (bool !== null) {
      return true
    }
    return false
  }

  async getAll (): Promise<CustomerResponse[]> {
    const customers = await this.model.find({})
    return customers
  }
}
