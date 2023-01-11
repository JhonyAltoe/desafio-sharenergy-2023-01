import { CustomerResponse } from '../../../../../domain/repositorie-types/customer-repository'

export const customersMock = (): CustomerResponse[] => [
  {
    id: 'uuid-1',
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
    id: 'uuid-2',
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
