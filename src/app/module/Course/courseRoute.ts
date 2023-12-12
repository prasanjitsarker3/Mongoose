import express from 'express'
import validateRequest from '../../middlwares/validateRequest'
import { CourseValidation } from './courseValidation'
import { courseControllers } from './courseController'

const router = express.Router()
router.post(
  '/create_course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  courseControllers.createCourse,
)
router.get('/', courseControllers.getAllCourses)
router.get('/:id', courseControllers.getSingleCourses)
router.delete('/:id', courseControllers.deletedCourses)
router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  courseControllers.updateCourses,
)

export const CourseRoutes = router
