import express from 'express'
import { AcademicSemesterController } from './academicSemesterController'
import validateRequest from '../../middlwares/validateRequest'
import { AcademicSemesterValidations } from './academicSemesterValidation'

const router = express.Router()

router.post(
  '/create-academicSemester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
)

router.get('/', AcademicSemesterController.getAllAcademicSemesters)
router.get('/:semesterId', AcademicSemesterController.getSingleAcademicSemester)
router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
)

export const AcademicSemesterRoutes = router
