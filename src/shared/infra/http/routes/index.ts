import { Router } from 'express'
import { appointmentsRouter } from 'modules/appointments/infra/http/routes/appointments'
import { sessionsRouter } from 'modules/users/infra/http/routes/sessions'
import { usersRouter } from 'modules/users/infra/http/routes/users'

export const Routes = Router()

Routes.use('/appointments', appointmentsRouter)
Routes.use('/users', usersRouter)
Routes.use('/sessions', sessionsRouter)

Routes.get('/', (request, response) => {
  return response.json({ message: 'Hello' })
})
