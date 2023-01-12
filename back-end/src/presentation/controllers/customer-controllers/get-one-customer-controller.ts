import { IGetOneCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/get-one-customer'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class GetOneCustomerController implements Controller {
  private readonly getOneCustomer: IGetOneCustomer

  constructor (createCustomer: IGetOneCustomer) {
    this.getOneCustomer = createCustomer
  }

  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (httpRequest.param === (undefined ?? '')) {
      return badRequest(new MissingParamError('email'))
    }

    return ok({ body: 'test' })
  }
}
