import { Schema, model } from 'mongoose'
import { TAcademicFaculty } from './academicFacultyInterface'

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
)

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFacultyCollection',
  academicFacultySchema,
)
