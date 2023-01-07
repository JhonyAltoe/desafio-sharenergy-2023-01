import { CustomerProps } from '../../../../entities/customer'

export const customers: CustomerProps[] = [
  {
    name: 'joao',
    email: 'joao@email.com',
    cpf: '99999999999',
    address: {
      city: 'serra',
      state: 'ES',
      street: 'rua das goiabas',
      number: '22',
      comment: 'my comment'
    },
    phone: '27999998888'
  },
  {
    name: 'maria',
    email: 'maria@email.com',
    cpf: '88888888888',
    address: {
      city: 'vitória',
      state: 'ES',
      street: 'rua das mangas',
      number: '2222',
      comment: 'my comment'
    },
    phone: '27999997777'
  }
]
