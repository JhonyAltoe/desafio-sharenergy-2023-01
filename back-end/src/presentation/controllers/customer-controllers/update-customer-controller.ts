import { IUpdateCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/update-customer'
import { MissingParamError } from '../../errors/missing-param-error'
import { NotFound } from '../../errors/not-found-error'
import { ServerError } from '../../errors/server-error'
import { badRequest, notFound, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class UpdateCustomerController implements Controller {
  private readonly updateCustomer: IUpdateCustomer

  constructor (updateCustomer: IUpdateCustomer) {
    this.updateCustomer = updateCustomer
  }

  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { param, body } = httpRequest
      if ([undefined, ''].some(e => e === param.id)) {
        return badRequest(new MissingParamError('id'))
      }

      if (Object.keys(body).length === 0) {
        return badRequest(new MissingParamError('body'))
      }
      const updatedOrError = await this.updateCustomer.update(httpRequest.param.id, httpRequest.body)
      if (updatedOrError instanceof Error) {
        return notFound(new NotFound(updatedOrError))
      }
      return ok(updatedOrError)
    } catch (error) {
      console.error(error)
      return serverError(new ServerError('internal server error'))
    }
  }
}
