import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateCustomerController implements Controller {
  handler: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
