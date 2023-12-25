import { z } from 'zod'
import { TSemesterRegistrationStatus } from './semesterRegistrationConstans'

const createSemesterRegistrationValidations = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...(TSemesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
})
const updateSemesterRegistrationValidations = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum([...(TSemesterRegistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
})

export const SemesterRegisterValidations = {
  createSemesterRegistrationValidations,
  updateSemesterRegistrationValidations,
}
