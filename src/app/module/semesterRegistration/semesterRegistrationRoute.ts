import express from 'express'
import validateRequest from '../../middlwares/validateRequest'
import { SemesterRegisterValidations } from './semesterRegistrationValidation'
import { SemesterRegistrationControllers } from './semesterRegistrationController'

const router = express.Router()

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegisterValidations.createSemesterRegistrationValidations,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
)
router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
)
router.patch(
  '/:id',
  validateRequest(
    SemesterRegisterValidations.updateSemesterRegistrationValidations,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
)
router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration)

export const SemesterRegistrationRoutes = router
