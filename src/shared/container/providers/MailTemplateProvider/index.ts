import { container } from 'tsyringe'

import HbsMailTemplateProvider from './implementations/HbsMailTemplateProvider'
import IMailTemplateProvider from './models/IMailTemplateProvider'

const providers = {
  handlebars: HbsMailTemplateProvider,
}

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
)
