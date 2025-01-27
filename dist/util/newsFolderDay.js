"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsFolderNews = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// logs
const logging_1 = require("../util/logging");
//
const newsFolderNews = (day) => {
    try {
        const folderName = day.toString();
        const newsFolderDay = path_1.default.join(__dirname, '..', '..', 'public/image/news', folderName);
        if (!fs_1.default.existsSync(folderName)) {
            logging_1.logger.info(`Создание папки ${folderName} в папке ${newsFolderDay}`);
            fs_1.default.mkdirSync(newsFolderDay, { recursive: true });
        }
        else {
            console.log(`Папка ${folderName} уже существует.`);
            return;
        }
    }
    catch (error) {
        logging_1.logger.error(`Ошибка при создании папки`);
        console.log('Папка уже существует' + ' ', error);
    }
};
exports.newsFolderNews = newsFolderNews;
