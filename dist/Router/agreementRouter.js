"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
//
const agreementController_1 = require("../Controller/agreementController");
const agreementRouter = (0, express_1.Router)();
//
const pathAgreetFolder = path_1.default.join(__dirname, '..', '..', '/public/agreet');
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pathAgreetFolder);
    },
    filename: (req, file, cb) => {
        cb(null, 'agreet' + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
agreementRouter.post('/agreet', upload.single('file'), agreementController_1.postAgreement);
agreementRouter.get('/agreet', agreementController_1.getAgreetment);
exports.default = agreementRouter;
