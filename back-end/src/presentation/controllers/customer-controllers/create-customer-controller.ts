import { ICreateCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/create-customer'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { ServerError } from '../../errors/server-error'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { isCustomerEmpty } from '../../helpers/isCustomerEmpty'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateCustomerController implements Controller {
  private readonly createCustomer: ICreateCustomer

  constructor (createCustomer: ICreateCustomer) {
    this.createCustomer = createCustomer
  }

  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const missingParamError = isCustomerEmpty(httpRequest.body)
      if (missingParamError !== null) {
        return badRequest(missingParamError)
      }

      const customerOrError = await this.createCustomer.create(httpRequest.body)
      if (customerOrError instanceof Error) {
        return badRequest(new InvalidParamError(customerOrError.message))
      }

      return ok(customerOrError)
    } catch (error) {
      console.log(error)
      return serverError(new ServerError('internal server error'))
    }
  }
}
