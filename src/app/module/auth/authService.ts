import httpStatus from 'http-status'
import AppError from '../../Error/AppError'
import User from '../user/userModel'
import { TLoginUser } from './authInterface'
import { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import bcrypt from 'bcrypt'
import { createToken } from './authUtils'
import jwt from 'jsonwebtoken'

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
  const accessToken = createToken(
    jwtPayload,
    config.jwtAccessToken as string,
    config.accessTokenExpaierDate as string,
  )
  const refreshToken = createToken(
    jwtPayload,
    config.jwtRefreshToken as string,
    config.refreshTokenExpaierDate as string,
  )

  return {
    accessToken,
    refreshToken,
    userRole: user?.role,
    needsPasswordChange: user?.needsPasswordChange,
  }
}

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistsByCustomId(userData.userId)
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
  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Old password doesn't match")
  }
  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcryptSalt),
  )

  await User.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  )
  return null
}

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwtRefreshToken as string,
  ) as JwtPayload
  const { userId, iat } = decoded

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
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }
  const accessToken = createToken(
    jwtPayload,
    config.jwtAccessToken as string,
    config.accessTokenExpaierDate as string,
  )
  return { accessToken }
}
export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
}
