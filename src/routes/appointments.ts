import { parseISO } from 'date-fns'
import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import { EnsureAuthenticated } from '../middleware'
import { AppointmentsRepository } from '../repositories'
import { CreateAppointmentService } from '../services'

export const appointmentsRouter = Router()

appointmentsRouter.use(EnsureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()

  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    })

    return response.json(appointment)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})
