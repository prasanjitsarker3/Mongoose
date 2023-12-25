import express from 'express'
import { FacultyControllers } from './facultyController'
import validateRequest from '../../middlwares/validateRequest'
import { updateFacultyValidationSchema } from './facultyValidation'
import auth from '../../middlwares/auth'
import { USER_ROLE } from '../user/userContants'

const router = express.Router()

router.get('/:id', FacultyControllers.getSingleFaculty)

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
)

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculties,
)

export const FacultyRoutes = router
