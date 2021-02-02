import IUpdatedUser from '@modules/users/dtos/UpdateUsersDTO'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class UserController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    const updateUser: IUpdatedUser = { ...user }

    delete updateUser.password

    return response.json(updateUser)
  }
}
