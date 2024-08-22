"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
// module
const loginRouter_1 = __importDefault(require("./Router/loginRouter"));
const teamRouter_1 = __importDefault(require("./Router/teamRouter"));
const projectRouter_1 = __importDefault(require("./Router/projectRouter"));
const newsRouter_1 = __importDefault(require("./Router/newsRouter"));
const programRouter_1 = __importDefault(require("./Router/programRouter"));
const epgRouter_1 = __importDefault(require("./Router/epgRouter"));
// middleware
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
const newsFolderDay_1 = require("./util/newsFolderDay");
const publicPath = path_1.default.join(__dirname, '..', 'public');
console.log(publicPath + '/js');
const app = (0, express_1.default)();
dotenv_1.default.config();
const pid = process.pid;
const date = new Date();
const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
console.log(`PID:${pid}`);
(0, newsFolderDay_1.newsFolderNews)(day);
// use
app.use(express_1.default.static("public"));
app.use(express_1.default.static(publicPath + "/js"));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
// use routes
app.use('/api/v1', loginRouter_1.default);
app.use('/api/v1', teamRouter_1.default);
app.use('/api/v1', projectRouter_1.default);
app.use('/api/v1', newsRouter_1.default);
app.use('/api/v1', programRouter_1.default);
app.use('/api/v1', epgRouter_1.default);
//
app.get('/login', (req, res) => {
    try {
        res.status(200).sendFile(publicPath + '/html/login.html');
    }
    catch (error) {
        console.error(error);
        res.status(400).sendFile('404.html');
    }
});
app.get('/', (req, res) => {
    try {
        res.redirect('/login');
    }
    catch (error) {
        console.error(error);
        res.status(400).sendFile('/404.html');
    }
});
app.get('/main', authMiddleware_1.default, (req, res) => {
    try {
        res.status(200).sendFile(publicPath + '/html/main.html');
    }
    catch (error) {
        console.error(error);
        res.status(400).sendFile('404.html');
    }
});
// team
app.get('/main/team', authMiddleware_1.default, (req, res) => {
    try {
        res.status(200).sendFile(publicPath + '/html/teamPage.html');
    }
    catch (error) {
        console.error(error);
        res.status(400).sendFile('404.html');
    }
});
app.get('/team/:id', authMiddleware_1.default, (req, res) => {
    try {
        res.status(200).sendFile(publicPath + '/html/teamCard.html');
    }
    catch (error) {
        console.error(error);
        res.status(400).sendFile('404.html');
    }
});
// news
app.get('/main/news', authMiddleware_1.default, (req, res) => {
    try {
        res.status(200).sendFile(publicPath + '/html/newsPage.html');
    }
    catch (error) {
        console.error(error);
        res.status(400).sendFile('404.html');
    }
});
// program
app.get('/main/program', (req, res) => {
    try {
        res.status(200).sendFile(publicPath + '/html/programPage.html');
    }
    catch (error) {
        console.error(error);
        res.status(400).sendFile('404.html');
    }
});
app.get('/program/:id', (req, res) => {
    try {
        res.status(200).sendFile(publicPath + '/html/programCard.html');
    }
    catch (error) {
        console.error(error);
        res.status(400).sendFile('404.html');
    }
});
// other
app.get('/*', (req, res) => {
    try {
        if (req.cookies.token) {
            res.redirect('/main');
            return;
        }
        res.redirect('/login');
    }
    catch (error) {
        res.status(400).sendFile('404.html');
    }
});
const PORT = process.env.PORT || 9000;
const startServer = () => {
    try {
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}\nPID:${pid}`));
    }
    catch (error) {
        console.error(`Сервер запущен с ошибкой.\тКод ошибки: ${error}`);
    }
};
startServer();
