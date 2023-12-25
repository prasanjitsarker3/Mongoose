import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { AuthService } from './authService'
import catchAsync from '../../utils/catchAsync'

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: result,
  })
})

export const AuthController = {
  loginUser,
}
