import multer from "multer"
import path from "path"
import fs from "fs"

//



export const storageUtilNews = (id: string) => {

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {

      const currentPath = path.join(__dirname, `../../public/image/news/`, `news_${id}`)

      if(!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath)
      }
      cb(null,  (currentPath))
    },
    filename:  (req, file, cb)  =>  {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
      cb(null,  file.originalname)
    }

  })


  return storage

}