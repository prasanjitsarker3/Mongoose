import { Router } from 'express'
import { userRoutes } from '../module/user/userRoute'
import { StudentRoutes } from '../module/student/student.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
