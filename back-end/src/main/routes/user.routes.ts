import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const userRoutes = express.Router()

userRoutes.route('/login').post((req: Request, res: Response) => {
  const { email, password } = req.body

  if (email === 'desafiosharenergy' && password === 'sh@r3n3rgy') {
    const token = jwt.sign({ email, password }, 'secretKey')
    res.status(200).json({ token })
  } else {
    res.status(400).json({ message: 'invalid email or password' })
  }
})

export { userRoutes }
