"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageUtilNews = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
//
const currentPath = path_1.default.join(__dirname, '..', '..', `/public/image/news/`);
const storageUtilNews = (folder) => {
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, (currentPath + folder));
        },
        filename: (req, file, cb) => {
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
            cb(null, file.originalname);
        }
    });
    return storage;
};
exports.storageUtilNews = storageUtilNews;
