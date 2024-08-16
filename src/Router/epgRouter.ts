import { Router } from "express";
import path from "path";
import multer from "multer";

// moduele

import { getEpg, postEpg } from '../Controller/epgController'

//

const epgRouter = Router();


const pathEpgFolder = path.join(__dirname, '..', '..', '/public/epg')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pathEpgFolder)
  },
  filename: (req, file, cb) => {
    cb(null, 'tv_epg' + '.xls')
  }
})

const upload = multer({ storage: storage })


epgRouter.get("/epg", getEpg)
epgRouter.post("/epg", upload.single('file'), postEpg)



export default epgRouter;