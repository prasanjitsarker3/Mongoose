import { AcademicSemester } from './../academicSemester/academicSemesterModel'
import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.modal'
import { TUser } from './userInterface'
import User from './userModel'
import { generateStudentId } from './userUtils'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {}
  //if password is not given , use deafult password
  userData.password = password || (config.defaultPass as string)
  //set student role
  userData.role = 'student'
  //Find Academic Semester Info
  const admissionSemesterId = await AcademicSemester.findById(
    payload.admissionSemester,
  )
  if (!admissionSemesterId) {
    // Handle the case when admissionSemesterId is null
    throw new Error('Admission semester not found') // Or handle appropriately
  }
  userData.id = await generateStudentId(admissionSemesterId)
  // create a user
  const newUser = await User.create(userData)
  //Create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id
    payload.user = newUser._id //reference _id
    const newStudent = await Student.create(payload)
    return newStudent
  }
}

export const userServices = {
  createStudentIntoDB,
}
