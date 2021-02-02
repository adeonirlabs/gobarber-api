import crypto from 'crypto'
import multer from 'multer'
import path from 'path'

const tpmFolder = path.resolve(__dirname, '..', '..', 'tmp')

export default {
  tpmFolder,
  uploadsFolder: path.resolve(tpmFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tpmFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
}
