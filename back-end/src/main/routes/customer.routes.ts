import express from 'express'
import { adaptRoute } from '../adapters/adapt-route-controller'
import { authToken } from '../middlewares/auth'

import {
  makeCreateCustomerController, makeGetAllCustomerController, makeGetOneCustomerController,
  makeRemoveCustomerController, makeUpdateCustomerController
} from '../factories'

const customerRoute = express.Router()

customerRoute.route('/create').post(adaptRoute(makeCreateCustomerController()))
customerRoute.route('/getone/:email').get(authToken, adaptRoute(makeGetOneCustomerController()))
customerRoute.route('/getall').get(authToken, adaptRoute(makeGetAllCustomerController()))
customerRoute.route('/remove:id').delete(authToken, adaptRoute(makeRemoveCustomerController()))
customerRoute.route('/update:id').patch(authToken, adaptRoute(makeUpdateCustomerController()))

export { customerRoute }
