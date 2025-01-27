"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// logger
const logging_1 = require("../util/logging");
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (!token) {
            logging_1.logger.error('Не получен токен доступа');
            return res.redirect('/login');
        }
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = user;
        logging_1.logger.info(`Пользователь авторизован ${JSON.stringify(user)}`);
        next();
    }
    catch (error) {
        logging_1.logger.error(`Ошибка авторизации пользователя ${error.message}`);
        res.clearCookie('token');
        return res.redirect('/login');
    }
};
exports.default = authMiddleware;
