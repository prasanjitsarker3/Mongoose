import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './academicDepartmentInterface'
import AppError from '../../Error/AppError'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFacultyCollection',
    },
  },

  {
    timestamps: true,
  },
)

academicDepartmentSchema.pre('save', async function (next) {
  const departmentExists = await AcademicDepartment.findOne({
    name: this.name,
  })
  if (departmentExists) {
    throw new AppError(404, 'Department is already exist !')
  }
  next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const departmentExists = await AcademicDepartment.findOne(query)
  if (!departmentExists) {
    throw new AppError(404, 'This Department does not exist !')
  }
  next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartmentCollection',
  academicDepartmentSchema,
)
