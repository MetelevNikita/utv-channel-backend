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
    user: process.env.DB_TEST_NAME,
    host: process.env.DB_TEST_HOST,
    database: process.env.DB_TEST_BASE,
    password: process.env.DB_TEST_PASSWORD,
    port: process.env.DB_TEST_PORT,
});
