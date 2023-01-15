import express, { Request, Response } from 'express'

const userRoutes = express.Router()

userRoutes.route('/login').post((req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'desafiosharenergy' && password === 'sh@r3n3rgy') {
    res.status(200).json({ message: 'successful login' })
  } else {
    res.status(400).json({ message: 'email or password invalid' })
  }
})

export { userRoutes }
