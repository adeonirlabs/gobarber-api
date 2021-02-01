import { parseISO } from 'date-fns'
import { Router } from 'express'
import { AppointmentsRepository } from 'modules/appointments/repositories/AppointmentsRepository'
import { CreateAppointmentService } from 'modules/appointments/services/CreateAppointmentService'
import { EnsureAuthenticated } from 'modules/users/infra/http/middleware/EnsureAuthenticated'
import { getCustomRepository } from 'typeorm'

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
