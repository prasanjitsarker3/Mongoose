import express from 'express'
import validateRequest from '../../middlwares/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartmentValidation'
import { AcademicDepartmentController } from './academicDepartmentController'

const router = express.Router()

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
)
router.get(
  '/all-department',
  AcademicDepartmentController.getAllAcademicDepartment,
)
router.get(
  '/:departmentId',
  AcademicDepartmentController.getSingleAcademicDepartment,
)
router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
)

export const AcademicDepartmentRoutes = router
