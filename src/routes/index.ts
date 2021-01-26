import { Router } from 'express'

import { appointmentsRouter } from './appointments'
import { sessionsRouter } from './sessions'
import { usersRouter } from './users'

export const Routes = Router()

Routes.use('/appointments', appointmentsRouter)
Routes.use('/users', usersRouter)
Routes.use('/sessions', sessionsRouter)

Routes.get('/', (request, response) => {
  return response.json({ message: 'Hello' })
})
