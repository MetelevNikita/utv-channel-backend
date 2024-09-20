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
exports.getUsers = exports.postLogin = void 0;
const database_1 = require("../db/database");
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const htmlPath = path_1.default.join(__dirname, '..', '..', '/public/html');
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUser = yield database_1.pool.query('SELECT * FROM users');
        console.log(getUser);
        // if(getUser.rows.length  < 1)  {
        //   return res.status(400).json({messge: 'Не верный логин или пароль'});
        // }
        res.status(200).json(getUser.rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Ошибка' });
    }
});
exports.getUsers = getUsers;
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const postLogin = yield database_1.pool.query('SELECT * FROM users WHERE email = $1 and password = $2', [email, password]);
        console.log(postLogin.rows);
        if (postLogin.rows.length < 1) {
            res.status(400).json({ messge: 'Не верный логин или пароль' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: postLogin.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('userId', postLogin.rows[0].id);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).send({ message: `Успешно` });
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
    }
});
exports.postLogin = postLogin;
