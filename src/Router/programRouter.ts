import { Router } from "express";
import multer from "multer";

// module

import { getProgram, getSingleProgram, postProgram, deleteProgram, updateProgram } from '../Controller/programController'
import { storageUtil } from "../util/storageUtil";

//

const upload = multer({ storage: storageUtil('program') });

// 


const programRouter = Router();

programRouter.get("/program", getProgram)
programRouter.get("/program/:id", getSingleProgram)
programRouter.post("/program", upload.single('file'), postProgram)
programRouter.put("/program", upload.single('file'), updateProgram)
programRouter.delete("/program/:id", deleteProgram)


export default programRouter;

