import { Router } from "express";

// module

import { postLogin, getUsers } from "../Controller/loginController";

//

const loginRouter = Router();

loginRouter.post('/login', postLogin)
loginRouter.get('/login', getUsers)

export default loginRouter;