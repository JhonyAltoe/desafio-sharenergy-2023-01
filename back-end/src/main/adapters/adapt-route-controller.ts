import { Request, Response } from 'express'
import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest } from '../../presentation/protocols/http'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request: HttpRequest = {
      body: req.body,
      param: req.params
    }

    const httpResponse = await controller.handler(request)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
