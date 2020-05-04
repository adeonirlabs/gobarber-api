import { Router } from 'express'
import multer from 'multer'

import { CreateUserService, UpdateUserAvatarService } from '../services'

import { EnsureAuthenticated } from '../middleware'

import uploadConfig from '../config/upload'

const upload = multer(uploadConfig)

export const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUser = new CreateUserService()

  const user = await createUser.execute({
    name,
    email,
    password,
  })

  delete user.password

  return response.json(user)
})

usersRouter.patch(
  '/avatar',
  EnsureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateAvatar = new UpdateUserAvatarService()

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      filename: request.file.filename,
    })

    delete user.password

    return response.json(user)
  },
)
