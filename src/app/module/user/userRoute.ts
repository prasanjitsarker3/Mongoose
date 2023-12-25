import express from 'express'
import { userController } from './userController'
import validateRequest from '../../middlwares/validateRequest'
import { createStudentValidationSchema } from '../student/student.zodvalition'
import { createFacultyValidationSchema } from '../Faculty/facultyValidation'
import { createAdminValidationSchema } from '../admin/adminValidation'
import auth from '../../middlwares/auth'
import { USER_ROLE } from './userContants'

const router = express.Router()
router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(createStudentValidationSchema),
  userController.createStudent,
)

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty,
)

router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  userController.createAdmin,
)

export const userRoutes = router
