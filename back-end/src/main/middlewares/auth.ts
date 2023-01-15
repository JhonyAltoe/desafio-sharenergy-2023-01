import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export function authToken (req: Request, res: Response, next: NextFunction): void {
  const { authorization } = req.headers
  if ([undefined, ''].some((e) => e === authorization)) {
    res.status(400).json({ message: 'miss parameter token in headers' })
    return
  }

  try {
    jwt.verify(authorization as string, 'secretKey')
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: 'invalid token' })
  }
}
