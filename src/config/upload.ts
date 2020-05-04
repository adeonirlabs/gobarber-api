import { resolve } from 'path'
import crypto from 'crypto'

import multer from 'multer'

const tmp = resolve(__dirname, '..', '..', 'tmp')

export default {
  dir: tmp,
  storage: multer.diskStorage({
    destination: tmp,
    filename(request, file, callback) {
      const hash = crypto.randomBytes(10).toString('hex')
      const name = `${hash}-${file.originalname}`

      return callback(null, name)
    },
  }),
}
