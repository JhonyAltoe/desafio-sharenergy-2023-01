export class NotFound extends Error {
  constructor (error: Error) {
    super(error.message)
    this.name = 'NotFound'
  }
}
