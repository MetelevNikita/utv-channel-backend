"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateViews = exports.deleteNews = exports.updateNews = exports.postNews = exports.getSingleNews = exports.getNews = void 0;
const database_1 = require("../db/database");
const date = new Date();
const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const getNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allNews = yield database_1.pool.query(`SELECT * FROM news`);
        if (allNews.rows.length < 1) {
            res.status(404).json({ message: 'Not news' });
            return;
        }
        console.log(allNews.rows);
        res.status(200).send(allNews.rows);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
    }
});
exports.getNews = getNews;
const getSingleNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (typeof id !== 'string') {
            res.status(400).send('Неверный формат id');
            return;
        }
        const singleNews = yield database_1.pool.query(`SELECT * FROM news WHERE id = ${id}`);
        if (singleNews.rows.length < 1) {
            res.status(404).send('Новости с таким id не найдено');
            return;
        }
        res.status(200).send(singleNews.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
    }
});
exports.getSingleNews = getSingleNews;
const postNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const { title, lead, author, date, video, text_1, comment_1, image_comment_1, text_2, comment_2, image_comment_2, text_3, comment_3, image_comment_3, text_4, comment_4, image_comment_4, text_5, comment_5, image_comment_5, text_6, comment_6, image_comment_6, text_7, comment_7, image_comment_7, text_8, comment_8, image_comment_8, text_9, comment_9, image_comment_9, text_10, comment_10, image_comment_10, tags, views } = req.body;
        let fullUrl = 'https://utvchannel.tw1.su' + `/image/news/${day}/`;
        const postNews = yield database_1.pool.query(`INSERT INTO news (title, lead, author, date, video,  text_1, comment_1, image_1, image_comment_1, text_2, comment_2, image_2, image_comment_2, text_3, comment_3, image_3, image_comment_3, text_4, comment_4, image_4, image_comment_4, text_5, comment_5, image_5, image_comment_5, text_6, comment_6, image_6, image_comment_6, text_7, comment_7, image_7, image_comment_7, text_8, comment_8, image_8, image_comment_8, text_9, comment_9, image_9, image_comment_9, text_10, comment_10, image_10, image_comment_10, tags, views) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47) RETURNING *`, [title, lead, author, date, video, text_1, comment_1, (req.files.file_1) ? fullUrl + req.files.file_1[0].originalname : '', image_comment_1, text_2, comment_2, (req.files.file_2) ? fullUrl + req.files.file_2[0].originalname : '', image_comment_2, text_3, comment_3, (req.files.file_3) ? fullUrl + req.files.file_3[0].originalname : '', image_comment_3, text_4, comment_4, (req.files.file_4) ? fullUrl + req.files.file_4[0].originalname : '', image_comment_4, text_5, comment_5, (req.files.file_5) ? fullUrl + req.files.file_5[0].originalname : '', image_comment_5, text_6, comment_6, (req.files.file_6) ? fullUrl + req.files.file_6[0].originalname : '', image_comment_6, text_7, comment_7, (req.files.file_7) ? fullUrl + req.files.file_7[0].originalname : '', image_comment_7, text_8, comment_8, (req.files.file_8) ? fullUrl + req.files.file_8[0].originalname : '', image_comment_8, text_9, comment_9, (req.files.file_9) ? fullUrl + req.files.file_9[0].originalname : '', image_comment_9, text_10, comment_10, (req.files.file_10) ? fullUrl + req.files.file_10[0].originalname : '', image_comment_10, tags, 0]);
        if (postNews.rows.length < 1) {
            res.status(404).send('Новости не созданы');
            return;
        }
        res.status(200).send(postNews.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
    }
});
exports.postNews = postNews;
const updateNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, title, lead, author, date, video, text_1, image_comment_1, comment_1, text_2, image_comment_2, comment_2, text_3, image_comment_3, comment_3, text_4, image_comment_4, comment_4, text_5, image_comment_5, comment_5, text_6, image_comment_6, comment_6, text_7, image_comment_7, comment_7, text_8, image_comment_8, comment_8, text_9, image_comment_9, comment_9, text_10, image_comment_10, comment_10, tags, views } = req.body;
        let fullUrl = 'https://utvchannel.tw1.su' + `/image/news/${day}/`;
        const updateNews = yield database_1.pool.query(`UPDATE news SET title = $1, lead = $2, author = $3, date = $4, video = $5,  text_1 = $6, comment_1 = $7, image_1 = $8, image_comment_1 = $9, text_2 = $10, comment_2 = $11, image_2 = $12, image_comment_2 = $13, text_3 = $14, comment_3 = $15, image_3 = $16, image_comment_3 = $17, text_4 = $18, comment_4 = $19, image_4 = $20, image_comment_4 = $21, text_5 = $22, comment_5 = $23, image_5 = $24, image_comment_5 = $25, text_6 = $26, comment_6 = $27, image_6 = $28, image_comment_6 = $29, text_7 = $30, comment_7 = $31, image_7 = $32, image_comment_7 = $33, text_8 = $34, comment_8 = $35, image_8 = $36, image_comment_8 = $37, text_9 = $38, comment_9 = $39, image_9 = $40, image_comment_9 = $41, text_10 = $42, comment_10 = $43, image_10 = $44, image_comment_10 = $45, tags = $46, views = $47 WHERE id = $48`, [title, lead, author, date, video, text_1, comment_1, (req.files.file_1) ? fullUrl + req.files.file_1[0].originalname : '', image_comment_1, text_2, comment_2, (req.files.file_2) ? fullUrl + req.files.file_2[0].originalname : '', image_comment_2, text_3, comment_3, (req.files.file_3) ? fullUrl + req.files.file_3[0].originalname : '', image_comment_3, text_4, comment_4, (req.files.file_4) ? fullUrl + req.files.file_4[0].originalname : '', image_comment_4, text_5, comment_5, (req.files.file_5) ? fullUrl + req.files.file_5[0].originalname : '', image_comment_5, text_6, comment_6, (req.files.file_6) ? fullUrl + req.files.file_6[0].originalname : '', image_comment_6, text_7, comment_7, (req.files.file_7) ? fullUrl + req.files.file_7[0].originalname : '', image_comment_7, text_8, comment_8, (req.files.file_8) ? fullUrl + req.files.file_8[0].originalname : '', image_comment_8, text_9, comment_9, (req.files.file_9) ? fullUrl + req.files.file_9[0].originalname : '', image_comment_9, text_10, comment_10, (req.files.file_10) ? fullUrl + req.files.file_10[0].originalname : '', image_comment_10, tags, 0, id]);
        if (!updateNews.rows) {
            res.status(404).send('Новости не созданы');
            return;
        }
        console.log(updateNews.rows);
        res.status(200).send(updateNews.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
    }
});
exports.updateNews = updateNews;
const deleteNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteNews = yield database_1.pool.query(`DELETE FROM news WHERE id = $1 RETURNING *`, [id]);
        res.status(200).send(deleteNews.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
    }
});
exports.deleteNews = deleteNews;
// update views
const updateViews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, views } = req.body;
        console.log(id);
        const newViews = 1;
        const updateViews = yield database_1.pool.query(`UPDATE news SET views = views + $1 WHERE id = $2 RETURNING *`, [newViews, id]);
        if (updateViews.rows.length < 1) {
            res.status(404).send('Новости с таким id не найдено');
            return;
        }
        res.status(200).send(updateViews.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
    }
});
exports.updateViews = updateViews;
