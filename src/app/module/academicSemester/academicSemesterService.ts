import { academicSemesterMapper } from './academicSemesterConstant'
import { TAcademicSemester } from './academicSemesterInterface'
import { AcademicSemester } from './academicSemesterModel'

const createAcademicSemesterInToDB = async (payload: TAcademicSemester) => {
  if (academicSemesterMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code !')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find()
  return result
}
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id)
  return result
}

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code !')
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    {
      new: true,
    },
  )
  return result
}
export const AcademicSemesterService = {
  createAcademicSemesterInToDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
}
