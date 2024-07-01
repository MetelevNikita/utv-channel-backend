import multer from "multer"
import path from "path"

//

const currentPath = path.join(__dirname, '..', '..',  `/public/image/`)

//


export const storageUtil = (path: string) => {

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,  (currentPath + path))
    },
    filename:  (req, file, cb)  =>  {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
      cb(null,  file.originalname)
    }

  })


  return storage

}