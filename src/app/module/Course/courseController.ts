import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { courseServices } from './courseServices'

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  })
})
const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCourseFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is fetch successfully',
    data: result,
  })
})
const getSingleCourses = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await courseServices.getSingleCourseFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  })
})
const deletedCourses = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await courseServices.deleteCourseFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  })
})
const updateCourses = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await courseServices.updateCourseIntoDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is update successfully',
    data: result,
  })
})

export const courseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourses,
  deletedCourses,
  updateCourses,
}
