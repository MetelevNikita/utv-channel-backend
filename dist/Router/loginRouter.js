"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// module
const loginController_1 = require("../Controller/loginController");
//
const loginRouter = (0, express_1.Router)();
loginRouter.post('/login', loginController_1.postLogin);
exports.default = loginRouter;
