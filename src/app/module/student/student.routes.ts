import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middlwares/validateRequest'
import { studentValidations } from './student.zodvalition'

const router = express.Router()

router.get('/:studentId', StudentControllers.getSingleStudent)
router.delete('/:studentId', StudentControllers.deleteStudent)
router.get('/', StudentControllers.getAllStudents)
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
)

export const StudentRoutes = router
