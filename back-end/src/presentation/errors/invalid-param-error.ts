export class InvalidParamError extends Error {
  constructor (param: string) {
    super(param)
    this.name = 'InvalidParamError'
  }
}
