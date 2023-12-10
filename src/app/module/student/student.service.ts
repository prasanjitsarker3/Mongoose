import httpStatus from 'http-status'
import AppError from '../../Error/AppError'
import { Student } from './student.modal'
import User from '../user/userModel'
import { TStudent } from './student.interface'

const getAllStudentsFromDB = async (query: Record<string>, unknown) => {
  console.log('Query', query)
  const queryObj = { ...query }
  const studentSearchableFields = ['email', 'middleName', 'presentAddress']
  const excludeFields = ['searchTerm', 'sort', 'limit']
  excludeFields.forEach((el) => delete queryObj[el])
  console.log({ query, queryObj })
  let searchTerm = ' '
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  let sort = '-createdAt'
  if (query.sort) {
    sort = query.sort as string
  }
  const sortQuery = filterQuery.sort(sort)
  let limit = 1
  if (query.limit) {
    limit = query.limit
  }
  const limitQuery = await sortQuery.limit(limit)
  return limitQuery
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const deleteStudentFromDB = async (id: string) => {
  // const result = await Student.updateOne({ id }, { isDeleted: true })
  // return result
  try {
    // Delete student
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    // Delete user
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    return deletedStudent
  } catch (err) {
    throw new Error('Failed to delete student')
  }
}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
}
