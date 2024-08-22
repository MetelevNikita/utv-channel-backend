"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
// module
const programController_1 = require("../Controller/programController");
const storageUtil_1 = require("../util/storageUtil");
//
const upload = (0, multer_1.default)({ storage: (0, storageUtil_1.storageUtil)('program') });
// 
const programRouter = (0, express_1.Router)();
programRouter.get("/program", programController_1.getProgram);
programRouter.get("/program/:id", programController_1.getSingleProgram);
programRouter.post("/program", upload.single('file'), programController_1.postProgram);
programRouter.put("/program", upload.single('file'), programController_1.updateProgram);
programRouter.delete("/program/:id", programController_1.deleteProgram);
exports.default = programRouter;
