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
exports.deleteTeam = exports.updateTeam = exports.postTeam = exports.getSingleTeam = exports.getTeam = void 0;
const database_1 = require("../db/database");
const getTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTeam = yield database_1.pool.query(`SELECT * FROM team`);
        if (getTeam.rows.length <= 0) {
            res.status(400).send([]);
            return;
        }
        res.status(200).send(getTeam.rows);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
    }
});
exports.getTeam = getTeam;
const getSingleTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getSingleTeam = yield database_1.pool.query('SELECT * FROM team WHERE id = $1', [id]);
        if (!getSingleTeam.rows[0]) {
            res.status(400).send(`Сотрудник с таким id не найден`);
            return;
        }
        res.status(200).send(getSingleTeam.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
    }
});
exports.getSingleTeam = getSingleTeam;
const postTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, profession } = req.body;
        const imageFile = req.file.originalname;
        const fullUrl = 'https://utvchannel.tw1.su' + '/image/team/' + imageFile;
        const newTeam = yield database_1.pool.query(`INSERT INTO team (name, profession, image) VALUES ($1, $2, $3) RETURNING *`, [name, profession, fullUrl]);
        if (!newTeam.rows[0]) {
            res.status(400).send(`Карточка сотрудника не создана`);
            return;
        }
        console.log(newTeam.rows[0]);
        res.status(200).send(newTeam.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
    }
});
exports.postTeam = postTeam;
const updateTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        console.log(req.files);
        const { id, name, profession } = req.body;
        if (!req.file) {
            res.status(400).send(`Не прислана картинка`);
            console.log('карточка не прислана');
            return;
        }
        const imageFile = req.file.originalname;
        const fullUrl = 'https://utvchannel.tw1.su' + '/image/team/' + imageFile;
        const updateTeam = yield database_1.pool.query(`UPDATE team SET name = $1, profession = $2, image = $3 WHERE id = $4 RETURNING *`, [name, profession, fullUrl, id]);
        if (!updateTeam.rows[0]) {
            res.status(400).send(`Карточка сотрудника не изменена`);
            return;
        }
        res.status(200).send(updateTeam.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
    }
});
exports.updateTeam = updateTeam;
const deleteTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteTeam = yield database_1.pool.query(`DELETE FROM team WHERE id  =  $1`, [id]);
        if (!deleteTeam.rows[0]) {
            res.status(400).send(`Карточка сотрудника не удалена`);
            return;
        }
        res.status(200).json({ message: 'Карточка удалена' });
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
    }
});
exports.deleteTeam = deleteTeam;
