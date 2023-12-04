import express from 'express'
import { userController } from './userController'
import validateRequest from '../../middlwares/validateRequest'
import { createStudentValidationSchema } from '../student/student.zodvalition'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  userController.createStudent,
)

export const userRoutes = router
