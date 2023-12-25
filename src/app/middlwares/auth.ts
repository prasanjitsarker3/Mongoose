import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../Error/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { TUserRole } from '../module/user/userInterface'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized !')
    }
    //check valid token

    jwt.verify(token, config.jwtAccessToken as string, function (err, decoded) {
      if (err) {
        throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized !')
      }
      const role = (decoded as JwtPayload).role
      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized !')
      }
      req.user = decoded as JwtPayload
      next()
    })
  })
}
export default auth
