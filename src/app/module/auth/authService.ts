import httpStatus from 'http-status'
import AppError from '../../Error/AppError'
import User from '../user/userModel'
import { TLoginUser } from './authInterface'
import jwt from 'jsonwebtoken'
import config from '../../config'

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id)
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
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password is d'not mathced")
  }

  //Access Granted :Send AccessToken and RefreshToken
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }
  const accessToken = jwt.sign(jwtPayload, config.jwtAccessToken as string, {
    expiresIn: '10d',
  })

  return {
    accessToken,
    userRole: user?.role,
    needsPasswordChange: user?.needsPasswordChange,
  }
}
export const AuthService = {
  loginUser,
}
