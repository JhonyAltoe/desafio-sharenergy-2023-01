export interface ICurstomer {
  name: string
  email: string
  phone: string
  address: string
  cpf: string
}

export class Customer {
  private readonly props: ICurstomer

  constructor (props: ICurstomer) {
    this.props = props
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
