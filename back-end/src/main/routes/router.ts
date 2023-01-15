import express from 'express'
import { customerRoute } from './customer.routes'
import { userRoutes } from './user.routes'
import { authToken } from '../middlewares/auth'

const router = express.Router()

router.use('/customer', authToken, customerRoute)
router.use('/user', userRoutes)

export { router }
