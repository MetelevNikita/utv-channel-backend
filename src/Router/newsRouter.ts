import { Router } from "express";
import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

// module

import { getNews, getSingleNews, postNews, updateNews, deleteNews } from '../Controller/newsController'
import { storageUtil } from "../util/storageUtil";


//


const upload = multer({storage: storageUtil('news')});


const newsRouter = Router();

newsRouter.get('/news', getNews)
newsRouter.get('/news/:id', getSingleNews)
newsRouter.post('/news', upload.fields([{name: 'file_1'}, {name: 'file_2'}, {name: 'file_3'}, {name: 'file_4'},{name: 'file_5'}, {name: 'file_6'}, {name: 'file_7'}, {name: 'file_8'}, {name: 'file_9'}, {name: 'file_10'}]), postNews)
newsRouter.put('/news', updateNews)
newsRouter.delete('/news/:id', deleteNews)


export default newsRouter;