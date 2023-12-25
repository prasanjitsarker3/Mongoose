import httpStatus from 'http-status'
import AppError from '../../Error/AppError'
import { AcademicSemester } from '../academicSemester/academicSemesterModel'
import { TSemesterRegistration } from './semesterRegsitrationInterface'
import { SemesterRegistration } from './semesterRegistrationModel'
import QueryBuilder from '../../builder/QueryBuilder'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester
  //Check if there any registered semester that is already 'UPCOMING'| 'ONGOING
  const isThereAnyUpComingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    })
  if (isThereAnyUpComingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isThereAnyUpComingOrOngoingSemester.status} register semester !`,
    )
  }

  const isAcademicSemesterExits =
    await AcademicSemester.findById(academicSemester)
  if (!isAcademicSemesterExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Semester not found!',
    )
  }

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  })
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Academic Semester Already Register!',
    )
  }

  const result = await SemesterRegistration.create(payload)
  return result
}
const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await semesterRegistrationQuery.modelQuery
  return result
}
const singleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id)
  return result
}
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //Check request semester id exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id)
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found!')
  }
  //if the requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists.status
  const requestedStatus = payload?.status
  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester already ${currentSemesterStatus}`,
    )
  }
  if (currentSemesterStatus === 'UPCOMING' && requestedStatus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    )
  }
  if (currentSemesterStatus === 'ONGOING' && requestedStatus === 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    )
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  singleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
}
