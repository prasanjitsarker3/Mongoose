import express from 'express'
import { FacultyControllers } from './facultyController'
import validateRequest from '../../middlwares/validateRequest'
import { updateFacultyValidationSchema } from './facultyValidation'
import auth from '../../middlwares/auth'

const router = express.Router()

router.get('/:id', FacultyControllers.getSingleFaculty)

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
)

router.get('/', auth(), FacultyControllers.getAllFaculties)

export const FacultyRoutes = router
