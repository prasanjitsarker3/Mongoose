import express from 'express'
import validateRequest from '../../middlwares/validateRequest'
import { AuthValidation } from './authValidation'
import { AuthController } from './authController'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
)

export const authRoutes = router
