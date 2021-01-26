import { Router } from 'express'

import { CreateSessionService } from '../services'

export const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body

    const createSession = new CreateSessionService()

    const { user, token } = await createSession.execute({
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

    return response.json({ user: userWithoutPassword, token })
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})
