/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/module/student/student.routes'
import { userRoutes } from './app/module/user/userRoute'
import globalErrorHandler from './app/middlwares/globalErrorHandler'
import notFound from './app/middlwares/notFound'
import router from './app/route/route'

const app: Application = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1', router)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
