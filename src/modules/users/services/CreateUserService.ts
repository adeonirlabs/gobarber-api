import { hash } from 'bcryptjs'
import { AppError } from 'shared/errors/AppError'
import { getRepository } from 'typeorm'

import { User } from '../infra/typeorm/entities/User'

type Request = {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const userExists = await usersRepository.findOne({
      where: { email },
    })

    if (userExists) {
      throw new AppError('This email is already registered!')
    }

    const hashPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashPassword,
    })

    await usersRepository.save(user)

    return user
  }
}
