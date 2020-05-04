import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import { Routes } from './routes'
import { AppError } from './errors'

import uploadConfig from './config/upload'

import './database'

const app = express()

app.use(express.json())
app.use('/files', express.static(uploadConfig.dir))
app.use(Routes)

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      })
    }

    console.error(error)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  },
)

app.listen(3333, () => {
  console.log('\n🚀 Server running at http://localhost:3333\n')
})
