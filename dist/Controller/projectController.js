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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProject = exports.deleteProject = exports.postProject = exports.getOneProject = exports.getProjects = void 0;
const database_1 = require("../db/database");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
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
        const id = (0, uuid_1.v4)();
        const { title, description, duration, year, author, channel, trailer } = req.body;
        const imageFile = req.file.originalname;
        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers.host;
        const url = protocol + '://' + host + '/image/project/' + `project_${id}.jpeg`;
        const inputPath = path_1.default.join(__dirname, '../../public/image/project', req.file.originalname);
        const outputPath = path_1.default.join(__dirname, '../../public/image/project', `project_${id}.jpeg`);
        yield (0, sharp_1.default)(inputPath).jpeg({ quality: 90 }).resize(540, 304).toFile(outputPath);
        fs_1.default.unlinkSync(inputPath);
        const postProject = yield database_1.pool.query('INSERT INTO project (title, description, duration, year, author, channel, trailer, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [title, description, duration, year, author, channel, trailer, url]);
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
        const idProject = (0, uuid_1.v4)();
        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers.host;
        const url = protocol + '://' + host + '/image/project/' + `project_${idProject}.jpeg`;
        const inputPath = path_1.default.join(__dirname, '../../public/image/project', req.file.originalname);
        const outputPath = path_1.default.join(__dirname, '../../public/image/project', `project_${idProject}.jpeg`);
        yield (0, sharp_1.default)(inputPath).png({ quality: 90 }).resize(540, 304).toFile(outputPath);
        fs_1.default.unlinkSync(inputPath);
        const updateProject = yield database_1.pool.query('UPDATE project SET title = $1, description = $2, duration = $3, year  =  $4, author  =  $5, channel = $6, trailer = $7, image = $8 WHERE id = $9', [title, description, duration, year, author, channel, trailer, url, id]);
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
