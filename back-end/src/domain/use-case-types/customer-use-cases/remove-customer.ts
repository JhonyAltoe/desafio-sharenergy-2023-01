export interface IRemoveCustomer {
  remove: (id: string) => Promise<void>
}
