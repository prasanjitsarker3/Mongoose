import { Router } from 'express'
import { userRoutes } from '../module/user/userRoute'
import { StudentRoutes } from '../module/student/student.routes'
import { AcademicSemesterRoutes } from '../module/academicSemester/academicSemesterRouter'

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
  {
    path: '/academicSemester',
    route: AcademicSemesterRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
