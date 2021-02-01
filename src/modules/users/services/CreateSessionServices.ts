import { compare } from 'bcryptjs'
import authConfig from 'config/auth'
import { sign } from 'jsonwebtoken'
import { AppError } from 'shared/errors/AppError'
import { getRepository } from 'typeorm'

import { User } from '../infra/typeorm/entities/User'

type Request = {
  email: string
  password: string
}

type Response = {
  user: User
  token: string
}

export class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      throw new AppError('Email or password does not match!', 401)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password does not match!', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user, token }
  }
}
