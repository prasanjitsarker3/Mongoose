import { NextFunction, Request, Response } from 'express'
import { userServices } from './userService'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body
    const result = await userServices.createStudentIntoDB(password, studentData)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const userController = {
  createStudent,
}
