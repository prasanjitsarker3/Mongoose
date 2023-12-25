import express from 'express'
import { AdminControllers } from './adminController'
import validateRequest from '../../middlwares/validateRequest'
import { updateAdminValidationSchema } from './adminValidation'

const router = express.Router()

router.get('/', AdminControllers.getAllAdmins)

router.get('/:id', AdminControllers.getSingleAdmin)

router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
)

router.delete('/:adminId', AdminControllers.deleteAdmin)

export const AdminRoutes = router
