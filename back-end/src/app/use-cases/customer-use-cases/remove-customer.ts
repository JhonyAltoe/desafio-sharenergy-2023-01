export interface IRemoveCustomer {
  remove: () => Promise<void>
}

export class RemoveCustomer implements IRemoveCustomer {
  remove: () => Promise<void>
}
