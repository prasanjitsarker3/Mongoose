import express from 'express'
import validateRequest from '../../middlwares/validateRequest'
import { AuthValidation } from './authValidation'
import { AuthController } from './authController'
import auth from '../../middlwares/auth'
import { USER_ROLE } from '../user/userContants'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
)
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword,
)
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidation),
  AuthController.refreshToken,
)

export const authRoutes = router
