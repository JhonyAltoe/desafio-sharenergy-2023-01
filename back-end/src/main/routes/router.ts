import express from 'express'
import { customerRoute } from './customer.routes'
import { userRoutes } from './user.routes'

const router = express.Router()

router.use('/customer', customerRoute)
router.use('/user', userRoutes)

export { router }
