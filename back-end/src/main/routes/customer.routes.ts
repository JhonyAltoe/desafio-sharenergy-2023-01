import express from 'express'
import { adaptRoute } from '../adapters/adapt-route-controller'
import { makeCreateCustomerController } from '../factories/make-create-customer-controller'

const customerRoute = express.Router()

customerRoute.route('/criar').post(adaptRoute(makeCreateCustomerController()))

export { customerRoute }
