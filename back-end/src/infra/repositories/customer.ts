import { Schema } from 'mongoose'
import { CustomerProps } from '../../domain/entities/customer'

export const customerMongooseSchema = new Schema<CustomerProps>({
  name: String,
  email: String,
  phone: String,
  address: {
    city: String,
    state: String,
    street: String,
    number: String,
    comment: String
  },
  cpf: String
}, { versionKey: false })

// class CustomerModel extends BaseModel<CustomerProps> {
//   constructor (model = mongooseCreateModel('customers', customerMongooseSchema)) {
//     super(model)
//   }
// }
