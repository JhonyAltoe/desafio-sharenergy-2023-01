import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export function isAuth (req: Request, res: Response): void {
  const { authorization } = req.headers
  if ([undefined, ''].some((e) => e === authorization)) {
    res.status(400).json({ message: 'miss parameter token in headers' })
    return
  }

  try {
    jwt.verify(authorization as string, 'secretKey')
    res.status(200).json({ message: true })
  } catch (error) {
    console.error(error)
    res.status(200).json({ message: false })
  }
}
