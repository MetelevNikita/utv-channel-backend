"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageUtilNews = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
//
const storageUtilNews = (id) => {
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            const currentPath = path_1.default.join(__dirname, `../../public/image/news/`, `news_${id}`);
            if (!fs_1.default.existsSync(currentPath)) {
                fs_1.default.mkdirSync(currentPath);
            }
            cb(null, (currentPath));
        },
        filename: (req, file, cb) => {
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
            cb(null, file.originalname);
        }
    });
    return storage;
};
exports.storageUtilNews = storageUtilNews;
