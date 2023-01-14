import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class UpdateCustomerController implements Controller {
  handler: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
