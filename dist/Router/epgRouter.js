"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
// moduele
const epgController_1 = require("../Controller/epgController");
//
const epgRouter = (0, express_1.Router)();
const pathEpgFolder = path_1.default.join(__dirname, '..', '..', '/public/epg');
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pathEpgFolder);
    },
    filename: (req, file, cb) => {
        cb(null, 'tv_epg' + '.xls');
    }
});
const upload = (0, multer_1.default)({ storage: storage });
epgRouter.get("/epg", epgController_1.getEpg);
epgRouter.post("/epg", upload.single('file'), epgController_1.postEpg);
exports.default = epgRouter;
