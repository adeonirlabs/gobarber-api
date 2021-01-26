import 'reflect-metadata'
import 'express-async-errors'
import './database'

import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'

import uploadConfig from './config/upload'
import { AppError } from './errors'
import { Routes } from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(Routes)

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      })
    }

    // eslint-disable-next-line
    console.error(error)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  },
)

app.listen(3333, () => {
  // eslint-disable-next-line
  console.log('\n🚀 Server running at http://localhost:3333\n')
})
