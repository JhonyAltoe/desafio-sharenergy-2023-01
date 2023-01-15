import express from 'express'
import { isAuth } from '../middlewares/is-auth'

const authenticationRoute = express.Router()

authenticationRoute.route('/is-authenticated').get(isAuth)

export { authenticationRoute }
