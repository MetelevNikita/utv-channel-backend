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
exports.updateProgram = exports.deleteProgram = exports.postProgram = exports.getSingleProgram = exports.getProgram = void 0;
const database_1 = require("../db/database");
const getProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProgram = yield database_1.pool.query("SELECT * FROM program");
        if (allProgram.rows.length < 1) {
            res.status(200).json({ message: 'Список программ пуст' });
            return;
        }
        res.status(200).json(allProgram.rows);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
exports.getProgram = getProgram;
const getSingleProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const singleProgrna = yield database_1.pool.query("SELECT * FROM program WHERE id = $1", [id]);
        if (singleProgrna.rows.length < 1) {
            res.status(200).json({ message: 'Программа не найдена' });
            return;
        }
        res.status(200).json(singleProgrna.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
exports.getSingleProgram = getSingleProgram;
const postProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, title, subtitle, description, link } = req.body;
        const imageFile = req.file.originalname;
        const fullUrl = req.protocol + '://' + req.get('host') + '/image/program/' + imageFile;
        const newProgram = yield database_1.pool.query("INSERT INTO program (image, date, title, subtitle, description, link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [fullUrl, date, title, subtitle, description, link]);
        if (newProgram.rows.length < 1) {
            res.status(200).json({ message: 'Программа не создана' });
            return;
        }
        res.status(200).json(newProgram.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
exports.postProgram = postProgram;
const deleteProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteProgram = yield database_1.pool.query("DELETE FROM program WHERE id = $1 RETURNING *", [id]);
        if (deleteProgram.rows.length < 1) {
            res.status(200).json({ message: 'Программа не удалена' });
            return;
        }
        res.status(200).json(deleteProgram.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
exports.deleteProgram = deleteProgram;
const updateProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, date, title, subtitle, description, link } = req.body;
        const imageFile = req.file.originalname;
        const fullUrl = req.protocol + '://' + req.get('host') + '/image/program/' + imageFile;
        const updateProgram = yield database_1.pool.query("UPDATE program SET image = $1, date = $2, title = $3, subtitle = $4, description = $5, link = $6 WHERE id = $7 RETURNING *", [fullUrl, date, title, subtitle, description, link, id]);
        if (updateProgram.rows.length < 0) {
            res.status(200).json({ message: 'Программа не обновлена' });
            return;
        }
        res.status(200).json(updateProgram.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
exports.updateProgram = updateProgram;
