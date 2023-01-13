import { HttpResponse } from '../protocols/http'

export function badRequest (error: Error): HttpResponse {
  return { statusCode: 400, body: { message: error.message } }
}

export function ok (data?: any, message?: string, statusCode?: number): HttpResponse {
  const response = {
    statusCode: statusCode ?? 200,
    body: {}
  }

  if (data !== null) response.body = { ...response.body, data }
  if (message !== null) response.body = { ...response.body, message }

  return response
}

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: { message: error.message }
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: { message: error.message }
})
