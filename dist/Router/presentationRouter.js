"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// module
const presentationController_1 = require("../Controller/presentationController");
const presentationRouter = (0, express_1.Router)();
//
presentationRouter.get('/presentation', presentationController_1.getPresentation);
// 
exports.default = presentationRouter;
