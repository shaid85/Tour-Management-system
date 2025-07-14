import { NextFunction, Request, Response } from 'express'
import AppError from '../errorhelpers/AppError'
import { JwtPayload } from 'jsonwebtoken'
import { verifyToken } from '../utils/jwt'
import { envVers } from '../config/env'

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization

      if (!accessToken) {
        throw new AppError(403, 'No token Recieved')
      }
      const verifiedToken = verifyToken(
        accessToken,
        envVers.JWT_ACCESS_SECRET
      ) as JwtPayload

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, 'You are not permitted')
      }

      req.user = verifiedToken
      next()
    } catch (error) {
      next(error)
    }
  }
