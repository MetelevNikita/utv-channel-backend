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
exports.updateProject = exports.deleteProject = exports.postProject = exports.getOneProject = exports.getProjects = void 0;
const database_1 = require("../db/database");
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allprojects = yield database_1.pool.query(`SELECT * FROM project`);
        if (allprojects.rows.length < 1) {
            res.status(404).json({ message: "Проекты не найдены" });
            return;
        }
        res.status(200).json(allprojects.rows);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
exports.getProjects = getProjects;
const getOneProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const sngleProject = yield database_1.pool.query('SELECT * FROM project WHERE id = $1', [id]);
        if (sngleProject.rows.length < 1) {
            res.status(404).json({ message: "No project found" });
            return;
        }
        res.status(200).json(sngleProject.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
exports.getOneProject = getOneProject;
const postProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { title, description, duration, year, author, channel, trailer } = req.body;
        const imageFile = req.file.originalname;
        const fullUrl = req.protocol + '://' + req.get('host') + '/image/project/' + imageFile;
        const postProject = yield database_1.pool.query('INSERT INTO project (title, description, duration, year, author, channel, trailer, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [title, description, duration, year, author, channel, trailer, fullUrl]);
        if (postProject.rows.length < 1) {
            res.status(404).json({ message: "project not create" });
            return;
        }
        res.status(200).json(postProject.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
exports.postProject = postProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (id == 0) {
            res.status(404).json({ message: "id not be a 0" });
            return;
        }
        const deleteProject = yield database_1.pool.query('DELETE FROM project WHERE id  =  $1 RETURNING  *', [id]);
        if (deleteProject.rows.length < 1) {
            res.status(404).json({ message: "Project not delete" });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
exports.deleteProject = deleteProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, title, description, duration, year, author, channel, trailer } = req.body;
        if (!req.file) {
            res.status(404).json({ message: "No image file" });
            return;
        }
        const imageFile = req.file.originalname;
        const fullUrl = req.protocol + '://' + req.get('host') + '/image/project/' + imageFile;
        const updateProject = yield database_1.pool.query('UPDATE project SET title = $1, description = $2, duration = $3, year  =  $4, author  =  $5, channel = $6, trailer = $7, image = $8 WHERE id = $9', [title, description, duration, year, author, channel, trailer, fullUrl, id]);
        console.log(updateProject.rows);
        if (!updateProject) {
            res.status(404).json({ message: "Карточка проекта не изменена" });
            return;
        }
        console.log(updateProject.rows[0]);
        res.status(200).json(updateProject.rows[0]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateProject = updateProject;
