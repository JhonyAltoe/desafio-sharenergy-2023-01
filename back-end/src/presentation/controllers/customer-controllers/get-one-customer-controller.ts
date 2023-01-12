import { IGetOneCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/get-one-customer'
import { MissingParamError } from '../../errors/missing-param-error'
import { NotFound } from '../../errors/not-found-error'
import { badRequest, notFound, ok } from '../../helpers/http-helper'
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

    const customerOrError = await this.getOneCustomer.getOne(httpRequest.param)
    if (customerOrError instanceof Error) {
      return notFound(new NotFound(customerOrError))
    }

    return ok(customerOrError)
  }
}
