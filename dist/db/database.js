"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_pool_1 = __importDefault(require("pg-pool"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pool = new pg_pool_1.default({
    user: 'postgres',
    host: 'localhost',
    database: 'channel',
    password: 'root',
    port: 5432,
});
