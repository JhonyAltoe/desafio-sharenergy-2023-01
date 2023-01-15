import express from 'express'
import { customerRoute } from './customer.routes'
import { userRoutes } from './user.routes'
import { authToken } from '../middlewares/auth'
import { authenticationRoute } from './authentication.routes'

const router = express.Router()

router.use('/customer', authToken, customerRoute)
router.use('/user', userRoutes)
router.use('/auth', authenticationRoute)

export { router }
