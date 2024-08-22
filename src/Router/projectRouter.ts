import { Router } from "express";
import multer from "multer";

// module

import { getProjects, getOneProject, postProject, updateProject, deleteProject } from "../Controller/projectController";
import { storageUtil } from "../util/storageUtil";

//

const upload = multer({ storage: storageUtil('project') });


const projectRouter = Router();

projectRouter.get("/project", getProjects)
projectRouter.get("/project/:id", getOneProject)
projectRouter.post("/project", upload.single('file'), postProject)
projectRouter.put("/project", upload.single('file'), updateProject)
projectRouter.delete("/project/:id", deleteProject)


export default projectRouter;