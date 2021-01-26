import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import { AppError } from '../errors'
import { Appointment } from '../models'
import { AppointmentsRepository } from '../repositories'

type Request = {
  provider_id: string
  date: Date
}

export class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked!')
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}
