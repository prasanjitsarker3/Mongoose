import { Router } from 'express'
import { userRoutes } from '../module/user/userRoute'
import { StudentRoutes } from '../module/student/student.routes'
import { AcademicSemesterRoutes } from '../module/academicSemester/academicSemesterRouter'
import { AcademicFacultyRoutes } from '../module/academicFaculty/academicFacultyRouter'
import { AcademicDepartmentRoutes } from '../module/academicDepartment/acadmicDepartmentRoute'
import { FacultyRoutes } from '../module/Faculty/facultyRoute'
import { CourseRoutes } from '../module/Course/courseRoute'
import { SemesterRegistrationRoutes } from '../module/semesterRegistration/semesterRegistrationRoute'
import { AdminRoutes } from '../module/admin/adminRoutes'
import { authRoutes } from '../module/auth/authRoute'

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
    path: '/admins',
    route: AdminRoutes,
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
  {
    path: '/semester-registration',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
