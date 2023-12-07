import express from 'express'
import validateRequest from '../../middlwares/validateRequest'
import { AcademicFacultyValidation } from './academicFacultyValidation'
import { AcademicFacultyController } from './academicFacultyController'

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
)
router.get('/all-faculty', AcademicFacultyController.getAllAcademicFaculty)
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty)
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
)

export const AcademicFacultyRoutes = router
