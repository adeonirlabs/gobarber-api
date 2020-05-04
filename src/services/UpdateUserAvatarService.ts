import { join } from 'path'
import fs from 'fs'
import { getRepository } from 'typeorm'

import { AppError } from '../errors'

import { User } from '../models'

import uploadConfig from '../config/upload'

interface Request {
  user_id: string
  filename: string
}

export class UpdateUserAvatarService {
  public async execute({ user_id, filename }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can update avatar!', 401)
    }

    if (user.avatar) {
      const avatarPath = join(uploadConfig.dir, user.avatar)
      const avatarExists = await fs.promises.stat(avatarPath)

      if (avatarExists) {
        await fs.promises.unlink(avatarPath)
      }
    }

    user.avatar = filename

    await usersRepository.save(user)

    return user
  }
}
