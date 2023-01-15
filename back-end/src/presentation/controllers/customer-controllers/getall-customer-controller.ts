import { IGetAllCustomer } from '../../../domain/use-case-interfaces/customer-use-cases/get-all-customer'
import { ServerError } from '../../errors/server-error'
import { ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class GetAllCustomerController implements Controller {
  private readonly getAllCustomer: IGetAllCustomer

  constructor (getAllCustomer: IGetAllCustomer) {
    this.getAllCustomer = getAllCustomer
  }

  async handler (_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const customerOrError = await this.getAllCustomer.getAll()

      return ok(customerOrError)
    } catch (error) {
      console.error(error)
      return serverError(new ServerError('internal server error'))
    }
  }
}
