import express from 'express'
import { customerRoute } from './customer.routes'
import { userRoutes } from './user.routes'
import { authenticationRoute } from './authentication.routes'

const router = express.Router()

router.use('/customer', customerRoute)
router.use('/user', userRoutes)
router.use('/auth', authenticationRoute)

export { router }
