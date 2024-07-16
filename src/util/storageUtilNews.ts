import multer from "multer"
import path from "path"
import fs from "fs"

//

const currentPath = path.join(__dirname, '..', '..',  `/public/image/news/`)

export const storageUtilNews = (folder: string) => {

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,  (currentPath + folder))
    },
    filename:  (req, file, cb)  =>  {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
      cb(null,  file.originalname)
    }

  })


  return storage

}