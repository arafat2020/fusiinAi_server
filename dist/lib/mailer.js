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
exports.Mailer = void 0;
const nodemailer_1 = require("nodemailer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Mailer {
    constructor(email, subject, text, res, entityID) {
        this.entityID = entityID;
        this.transport = (0, nodemailer_1.createTransport)({
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        this.mailOptionsTXT = {
            from: process.env.USER,
            to: email ? email : 'arafatmannan9@gmail.com',
            subject: subject,
            text: text,
        };
        this.info = {
            err: false,
            info: 'idle'
        };
        this.res = res;
    }
    snedMail() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.transport.sendMail(this.mailOptionsTXT, (err, data) => {
                if (err) {
                    this.res.status(500).send(err);
                }
                else {
                    this.res.send({
                        entityID: this.entityID,
                        data
                    });
                }
            });
        });
    }
}
exports.Mailer = Mailer;
