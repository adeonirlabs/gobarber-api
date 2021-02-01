import uploadConfig from 'config/upload'
import fs from 'fs'
import { join } from 'path'
import { AppError } from 'shared/errors/AppError'
import { getRepository } from 'typeorm'

import { User } from '../infra/typeorm/entities/User'

type Request = {
  user_id: string
  avatar_filename: string
}

export class UpdateUserAvatarService {
  public async execute({ user_id, avatar_filename }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can update avatar!', 401)
    }

    if (user.avatar) {
      const avatarPath = join(uploadConfig.directory, user.avatar)
      const avatarExists = await fs.promises.stat(avatarPath)

      if (avatarExists) {
        await fs.promises.unlink(avatarPath)
      }
    }

    user.avatar = avatar_filename

    await usersRepository.save(user)

    return user
  }
}
