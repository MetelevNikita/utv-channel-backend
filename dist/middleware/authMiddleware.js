"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    try {
        if (!token) {
            return res.redirect('/login');
        }
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = user;
        console.log(user);
        next();
    }
    catch (error) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};
exports.default = authMiddleware;
