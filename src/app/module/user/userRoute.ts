import express from 'express'
import { userController } from './userController'
import validateRequest from '../../middlwares/validateRequest'
import { createStudentValidationSchema } from '../student/student.zodvalition'
import { createFacultyValidationSchema } from '../Faculty/facultyValidation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  userController.createStudent,
)
router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty,
)

export const userRoutes = router
