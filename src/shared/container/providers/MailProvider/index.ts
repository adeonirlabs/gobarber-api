import mailConfig from '@config/mail'
import { container } from 'tsyringe'

import CustomMailProvider from './implementations/CustomMailProvider'
import EtherealMailProvider from './implementations/EtherealMailProvider'
import IMailProvider from './models/IMailProvider'

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  custom: container.resolve(CustomMailProvider),
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
)
