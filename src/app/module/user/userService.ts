import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.modal'
import { TUser } from './userInterface'
// import { NewUser } from './userInterface'
import User from './userModel'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {}
  //if password is not given , use deafult password
  userData.password = password || (config.defaultPass as string)
  //set student role
  userData.role = 'student'
  //set manually generated it
  userData.id = '2030100001'
  // create a user
  const newUser = await User.create(userData)
  //Create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    studentData.id = newUser.id
    studentData.user = newUser._id //reference _id
    const newStudent = await Student.create(studentData)
    return newStudent
  }
}

export const userServices = {
  createStudentIntoDB,
}
