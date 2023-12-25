import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../Error/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { TUserRole } from '../module/user/userInterface'
import User from '../module/user/userModel'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized !')
    }

    //check valid token
    const decoded = jwt.verify(
      token,
      config.jwtAccessToken as string,
    ) as JwtPayload
    const { userId, role, iat } = decoded

    const user = await User.isUserExistsByCustomId(userId)
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is not found!')
    }
    const isUserDeleted = user?.isDeleted
    if (isUserDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, 'This User Is Deleted')
    }
    const isUserStatus = user?.status
    if (isUserStatus === 'block') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user status block !')
    }
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized !')
    }

    req.user = decoded as JwtPayload
    next()

    // jwt.verify(token, config.jwtAccessToken as string, function (err, decoded) {
    //   if (err) {
    //     throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized !')
    //   }
    //   const role = (decoded as JwtPayload).role
    //   if (requiredRoles && !requiredRoles.includes(role)) {
    //     throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized !')
    //   }
    //   req.user = decoded as JwtPayload
    //   next()
    // })
  })
}
export default auth
