import { Router } from "express";
import multer from "multer";
import path from "path";


// util

import { storageUtil } from "../util/storageUtil";


// module

import { getTeam, getSingleTeam, postTeam, updateTeam, deleteTeam  } from "../Controller/teamController";

//



const upload = multer({storage: storageUtil('team')});


const teamRouter = Router();


teamRouter.get("/team", getTeam)

teamRouter.get("/team/:id", getSingleTeam)

teamRouter.post("/team", upload.single('file'), postTeam)

teamRouter.put("/team", updateTeam)

teamRouter.delete("/team/:id", deleteTeam)



export default teamRouter;