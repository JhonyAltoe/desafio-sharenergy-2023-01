import { EmailValidator } from '../protocols/emailValidator'

export interface ICurstomer {
  name: string
  email: string
  phone: string
  address: string
  cpf: string
}

export class Customer {
  private readonly props: ICurstomer
  private readonly emailValidator: EmailValidator

  constructor (props: ICurstomer, emailValidator: EmailValidator) {
    this.props = props
    this.emailValidator = emailValidator
    this.validateName()
    this.validateEmail(this.email)
  }

  validateEmail (email: string): void {
    if (!this.emailValidator.isValid(email)) {
      throw new Error('Should be a valid email')
    }
  }

  validateName (): void {
    if (this.name.length < 3) {
      throw new Error('Should have more than 2 characteres')
    }
  }

  get name (): string {
    return this.props.name
  }

  get email (): string {
    return this.props.email
  }

  get phone (): string {
    return this.props.phone
  }

  get address (): string {
    return this.props.address
  }

  get cpf (): string {
    return this.props.cpf
  }
}
