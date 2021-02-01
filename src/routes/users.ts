import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'
import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated'
import { CreateUserService } from '../services/CreateUserService'
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService'

const upload = multer(uploadConfig)

export const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }

    return response.json(userWithoutPassword)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

usersRouter.patch(
  '/avatar',
  EnsureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService()

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatar_filename: request.file.filename,
      })

      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      }

      return response.json(userWithoutPassword)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  },
)
