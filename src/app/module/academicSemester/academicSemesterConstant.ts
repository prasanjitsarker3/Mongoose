import {
  TAcademicSemesterCode,
  TAcademicSemesterMapper,
  TAcademicSemesterName,
  TMonths,
} from './academicSemesterInterface'

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
export const AcademicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
]
export const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03']

export const academicSemesterMapper: TAcademicSemesterMapper = {
  Autumn: '1',
  Summer: '02',
  Fall: '03',
}
