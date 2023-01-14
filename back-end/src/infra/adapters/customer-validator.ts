import { EmailValidator } from '../../domain/protocols/emailValidator'
import { emailSchema } from '../validators/joi/customer-validator'

export class EmailValidatorJoi implements EmailValidator {
  isValid (email: string): boolean {
    const error = emailSchema.validate(email).error
    if (error !== undefined) {
      return false
    }
    return true
  }
}
