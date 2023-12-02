import { Request, Response } from 'express'
import { userServices } from './userService'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body
    const result = await userServices.createStudentIntoDB(password, studentData)

    res.status(201).json({
      status: 'success',
      message: 'Student created successfully',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

export const userController = {
  createStudent,
}
