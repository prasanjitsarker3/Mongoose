import { Router } from 'express'
import { userRoutes } from '../module/user/userRoute'
import { StudentRoutes } from '../module/student/student.routes'
import { AcademicSemesterRoutes } from '../module/academicSemester/academicSemesterRouter'
import { AcademicFacultyRoutes } from '../module/academicFaculty/academicFacultyRouter'
import { AcademicDepartmentRoutes } from '../module/academicDepartment/acadmicDepartmentRoute'
import { FacultyRoutes } from '../module/Faculty/facultyRoute'
import { CourseRoutes } from '../module/Course/courseRoute'

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
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/academicSemester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/department',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
