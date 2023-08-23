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
exports.sendCode = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mailer_1 = require("../../lib/mailer");
const redisInstence_1 = require("../../lib/redisInstence");
dotenv_1.default.config();
const sendCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userID } = req.body;
    console.log(email, userID);
    if (email && userID) {
        const code = new redisInstence_1.CodeGenaretor(email, userID);
        console.log(code.generateCode());
        const instaneofCode = yield code.newCode();
        const mailer = new mailer_1.Mailer(email, 'Confermation Code', `Confermation code  is ${instaneofCode.code.codex}`, res, instaneofCode.entityID ? instaneofCode.entityID : 'none');
        instaneofCode.isCode ? mailer.snedMail() : res.sendStatus(500);
    }
    else {
        res.sendStatus(400);
    }
});
exports.sendCode = sendCode;
