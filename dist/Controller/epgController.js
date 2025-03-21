"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEpg = exports.getEpg = void 0;
const path_1 = __importDefault(require("path"));
const XLSX = __importStar(require("xlsx"));
const getEpg = (req, res) => {
    try {
        const file = XLSX.readFile(path_1.default.join(__dirname, '../../public/epg/tv_epg.xls'));
        if (!file) {
            res.status(404).send('File not found');
            return;
        }
        const sheetNames = file.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(file.Sheets[sheetNames]);
        const newEpg = data.map((item) => {
            const unixTime = Number(Object.values(item)[1]);
            const hours = Math.floor(unixTime * 24);
            const minutes = Math.floor((unixTime * 24 - hours) * 60);
            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            const newObjEpg = {
                id: 1,
                date: [new Date((Number(Object.values(item)[0]) - 25569) * 86400000).toDateString().split(' ')[0], new Date((Number(Object.values(item)[0]) - 25569) * 86400000).toLocaleDateString()],
                time: formattedTime,
                marker: Object.values(item)[2],
                title: Object.values(item)[3],
                subtitle: Object.values(item)[4]
            };
            return newObjEpg;
        });
        res.status(200).json(newEpg);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getEpg = getEpg;
const postEpg = (req, res) => {
    const file = req.file;
    console.log(file);
    if (!file) {
        res.status(404).send('File not found');
        return;
    }
    res.status(200).send({ message: 'Файл успешно загружен' });
};
exports.postEpg = postEpg;
