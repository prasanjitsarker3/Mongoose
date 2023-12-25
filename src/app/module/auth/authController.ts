import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { AuthService } from './authService'
import catchAsync from '../../utils/catchAsync'
import config from '../../config'

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body)
  const { refreshToken } = result
  res.cookie('refreshToken', refreshToken, {
    secure: config.projectProcess === 'Production',
    httpOnly: true,
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: result,
  })
})
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body
  const result = await AuthService.changePassword(req.user, passwordData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Update successfully',
    data: result,
  })
})
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await AuthService.refreshToken(refreshToken)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully',
    data: result,
  })
})

export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
}
