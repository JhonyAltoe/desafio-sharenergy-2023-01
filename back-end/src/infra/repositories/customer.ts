import { Schema } from 'mongoose'
import { CustomerResponse } from '../../domain/repositorie-interfaces/customer-repository'

const address = {
  city: String,
  state: String,
  street: String,
  number: String,
  comment: String
}

export const customerMongooseSchema = new Schema<CustomerResponse>({
  _id: String,
  name: String,
  email: String,
  phone: String,
  address,
  cpf: String
}, { versionKey: false })
