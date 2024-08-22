"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
// util
const storageUtil_1 = require("../util/storageUtil");
// module
const teamController_1 = require("../Controller/teamController");
//
const upload = (0, multer_1.default)({ storage: (0, storageUtil_1.storageUtil)('team') });
const teamRouter = (0, express_1.Router)();
teamRouter.get("/team", teamController_1.getTeam);
teamRouter.get("/team/:id", teamController_1.getSingleTeam);
teamRouter.post("/team", upload.single('file'), teamController_1.postTeam);
teamRouter.put("/team", upload.single('file'), teamController_1.updateTeam);
teamRouter.delete("/team/:id", teamController_1.deleteTeam);
exports.default = teamRouter;
