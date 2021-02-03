import '@modules/users/providers'
import './providers'

import Appointmentsrepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import { container } from 'tsyringe'

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  Appointmentsrepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
)

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
)
