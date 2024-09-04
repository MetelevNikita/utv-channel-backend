"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
// module
const projectController_1 = require("../Controller/projectController");
const storageUtil_1 = require("../util/storageUtil");
//
const upload = (0, multer_1.default)({ storage: (0, storageUtil_1.storageUtil)('project') });
const projectRouter = (0, express_1.Router)();
projectRouter.get("/project", projectController_1.getProjects);
projectRouter.get("/project/:id", projectController_1.getOneProject);
projectRouter.post("/project", upload.single('file'), projectController_1.postProject);
projectRouter.put("/project", upload.single('file'), projectController_1.updateProject);
projectRouter.delete("/project/:id", projectController_1.deleteProject);
exports.default = projectRouter;
