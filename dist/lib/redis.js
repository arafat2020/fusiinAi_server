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
exports.setCode = exports.creatNotificarion = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redis = (0, redis_1.createClient)({
    url: process.env.REDIS
});
redis.on('error', err => console.log('Redis Client Error', err));
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (redis.isOpen)
            return;
        yield redis.connect();
    });
}
function creatNotificarion(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const obj = params;
        yield connect();
        yield redis.hSet(obj.id, obj.userId, JSON.stringify(obj));
        yield redis.expire(obj.userId, 3600 * 2);
        const notice = yield redis.hGetAll(obj.id);
        return notice;
    });
}
exports.creatNotificarion = creatNotificarion;
function setCode(code, key) {
    return __awaiter(this, void 0, void 0, function* () {
        yield connect();
        yield redis.set(key, `${code}`);
        yield redis.expire(key, 3600);
        const value = yield redis.get(key);
        return value;
    });
}
exports.setCode = setCode;
