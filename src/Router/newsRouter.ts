import { Router } from "express";
import multer from "multer";

// module

import { getNews, getSingleNews, postNews, updateNews, deleteNews, updateViews } from '../Controller/newsController'
import { storageUtilNews } from "../util/storageUtilNews"





//


const date = new Date();
const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const upload = multer({storage: storageUtilNews(day)});


//

const newsRouter = Router();

newsRouter.get('/news', getNews)
newsRouter.get('/news/:id', getSingleNews)
newsRouter.post('/news', upload.fields([{name: 'file_1'}, {name: 'file_2'}, {name: 'file_3'}, {name: 'file_4'},{name: 'file_5'}, {name: 'file_6'}, {name: 'file_7'}, {name: 'file_8'}, {name: 'file_9'}, {name: 'file_10'}, {name: 'title_image'}]), postNews)
newsRouter.put('/news', upload.fields([{name: 'file_1'}, {name: 'file_2'}, {name: 'file_3'}, {name: 'file_4'},{name: 'file_5'}, {name: 'file_6'}, {name: 'file_7'}, {name: 'file_8'}, {name: 'file_9'}, {name: 'file_10'}, {name: 'title_image'}]), updateNews)
newsRouter.delete('/news/:id', deleteNews)

// views

newsRouter.put('/news/views', updateViews)


export default newsRouter;