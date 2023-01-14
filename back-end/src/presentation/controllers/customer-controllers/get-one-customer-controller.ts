import { IGetOneCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/get-one-customer'
import { MissingParamError } from '../../errors/missing-param-error'
import { NotFound } from '../../errors/not-found-error'
import { ServerError } from '../../errors/server-error'
import { badRequest, notFound, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class GetOneCustomerController implements Controller {
  private readonly getOneCustomer: IGetOneCustomer

  constructor (getOneCustomer: IGetOneCustomer) {
    this.getOneCustomer = getOneCustomer
  }

  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { param } = httpRequest
      if ([undefined, ''].some((e) => e === param.email)) {
        return badRequest(new MissingParamError('email'))
      }

      const customerOrError = await this.getOneCustomer.getOne(param.email)
      if (customerOrError instanceof Error) {
        return notFound(new NotFound(customerOrError))
      }

      return ok(customerOrError)
    } catch (error) {
      console.log(error)
      return serverError(new ServerError('internal server error'))
    }
  }
}
