import { HttpResponse } from '../protocols/http'

export function badRequest (error: Error): HttpResponse {
  return { statusCode: 400, body: { message: error.message } }
}

export function ok (data: any, statusCode?: number): HttpResponse {
  return { statusCode: statusCode ?? 200, body: { data } }
}
