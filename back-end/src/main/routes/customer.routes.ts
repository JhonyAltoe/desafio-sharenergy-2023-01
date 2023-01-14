import express from 'express'
import { adaptRoute } from '../adapters/adapt-route-controller'

import {
  makeCreateCustomerController, makeGetAllCustomerController, makeGetOneCustomerController,
  makeRemoveCustomerController, makeUpdateCustomerController
} from '../factories'

const customerRoute = express.Router()

customerRoute.route('/create').post(adaptRoute(makeCreateCustomerController()))
customerRoute.route('/getone/:email').get(adaptRoute(makeGetOneCustomerController()))
customerRoute.route('/getall').get(adaptRoute(makeGetAllCustomerController()))
customerRoute.route('/remove:id').delete(adaptRoute(makeRemoveCustomerController()))
customerRoute.route('/update:id').patch(adaptRoute(makeUpdateCustomerController()))

export { customerRoute }
