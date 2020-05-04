import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns'

import { AppointmentsRepository } from '../repositories'
import { CreateAppointmentService } from '../services'

import { EnsureAuthenticated } from '../middleware'

export const appointmentsRouter = Router()

appointmentsRouter.use(EnsureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()

  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body
  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  })

  return response.json(appointment)
})
