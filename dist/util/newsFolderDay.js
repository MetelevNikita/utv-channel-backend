"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsFolderNews = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//
const newsFolderNews = (day) => {
    try {
        const folderName = day.toString();
        const newsFolderDay = path_1.default.join(__dirname, '..', '..', 'public/image/news', folderName);
        if (!fs_1.default.existsSync(folderName)) {
            fs_1.default.mkdirSync(newsFolderDay, { recursive: true });
        }
        else {
            console.log(`Папка ${folderName} уже существует.`);
            return;
        }
    }
    catch (error) {
        console.log('Папка уже существует' + ' ', error);
    }
};
exports.newsFolderNews = newsFolderNews;
