import authConfig from 'config/auth'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from 'shared/errors/AppError'

type TokenPayload = {
  iat: number
  exp: number
  sub: string
}

export const EnsureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const { authorization } = request.headers

  if (!authorization) {
    throw new AppError('JWT token is missing!', 403)
  }

  const [, token] = authorization.split(' ')

  const { secret } = authConfig.jwt

  try {
    const decoded = verify(token, secret)

    const { sub } = decoded as TokenPayload

    request.user = {
      id: sub,
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT token!', 403)
  }
}
