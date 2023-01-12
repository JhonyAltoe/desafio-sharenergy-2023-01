export class MissingParamError extends Error {
  constructor (param: string) {
    super(`missing parameter: ${param}`)
    this.name = 'MissingParamError'
  }
}
