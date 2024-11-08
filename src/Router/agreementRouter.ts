import { Router } from "express";
import multer from "multer";
import path from "path";

//

import { postAgreement } from "../Controller/agreementController";


const agreementRouter = Router();

//


const pathAgreetFolder = path.join(__dirname, '..', '..', '/public/agreet')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pathAgreetFolder)
  },
  filename: (req, file, cb) => {
    cb(null, 'agreet' + path.extname(file.originalname))
  }

})


const upload = multer({storage: storage})


agreementRouter.post('/agreetment', upload.single('file'), postAgreement)


export default agreementRouter
