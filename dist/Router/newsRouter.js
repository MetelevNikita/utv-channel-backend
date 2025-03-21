"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
// module
const newsController_1 = require("../Controller/newsController");
const storageUtilNews_1 = require("../util/storageUtilNews");
const id = (0, uuid_1.v4)();
//
const upload = (0, multer_1.default)({ storage: (0, storageUtilNews_1.storageUtilNews)(id) });
//
const newsRouter = (0, express_1.Router)();
newsRouter.get('/news', newsController_1.getNews);
newsRouter.get('/news/:id', newsController_1.getSingleNews);
newsRouter.post('/news', upload.fields([{ name: 'file_1' }, { name: 'file_2' }, { name: 'file_3' }, { name: 'file_4' }, { name: 'file_5' }, { name: 'file_6' }, { name: 'file_7' }, { name: 'file_8' }, { name: 'file_9' }, { name: 'file_10' }, { name: 'title_image' }]), newsController_1.postNews);
newsRouter.put('/news', upload.fields([{ name: 'file_1' }, { name: 'file_2' }, { name: 'file_3' }, { name: 'file_4' }, { name: 'file_5' }, { name: 'file_6' }, { name: 'file_7' }, { name: 'file_8' }, { name: 'file_9' }, { name: 'file_10' }, { name: 'title_image' }]), newsController_1.updateNews);
newsRouter.delete('/news/:id', newsController_1.deleteNews);
// views
newsRouter.put('/news/views', newsController_1.updateViews);
exports.default = newsRouter;
