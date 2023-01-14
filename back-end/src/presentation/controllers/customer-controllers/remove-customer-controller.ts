import { IRemoveCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/remove-customer'
import { MissingParamError } from '../../errors/missing-param-error'
import { ServerError } from '../../errors/server-error'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class RemoveCustomerController implements Controller {
  private readonly removeCustomer: IRemoveCustomer

  constructor (removeCustomer: IRemoveCustomer) {
    this.removeCustomer = removeCustomer
  }

  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (httpRequest.param === (undefined ?? '')) {
        return badRequest(new MissingParamError('id'))
      }

      await this.removeCustomer.remove(httpRequest.param)
      return ok()
    } catch (error) {
      console.log(error)
      return serverError(new ServerError('internal server error'))
    }
  }
}
