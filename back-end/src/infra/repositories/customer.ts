import { Schema } from 'mongoose'
import { CustomerProps } from '../../domain/entities/customer'
import { AddressProps } from '../../domain/entities/address'

const addressMongooseSchema = new Schema<AddressProps>({
  city: String,
  state: String,
  street: String,
  number: String,
  comment: String
})

export const customerMongooseSchema = new Schema<CustomerProps>({
  name: String,
  email: String,
  phone: String,
  address: addressMongooseSchema,
  cpf: String
}, { versionKey: false })

// class CustomerModel extends BaseModel<CustomerProps> {
//   constructor (model = mongooseCreateModel('customers', customerMongooseSchema)) {
//     super(model)
//   }
// }
