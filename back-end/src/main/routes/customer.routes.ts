import express from 'express'
import { adaptRoute } from '../adapters/adapt-route-controller'

import {
  makeCreateCustomerController, makeGetOneCustomerController, makeRemoveCustomerController
} from '../factories'

const customerRoute = express.Router()

customerRoute.route('/criar').post(adaptRoute(makeCreateCustomerController()))
customerRoute.route('/:email').get(adaptRoute(makeGetOneCustomerController()))
customerRoute.route('/:id').delete(adaptRoute(makeRemoveCustomerController()))

export { customerRoute }
