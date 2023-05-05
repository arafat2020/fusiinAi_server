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
exports.register = void 0;
const client_1 = require("@prisma/client");
const bson_1 = require("bson");
const validator_1 = __importDefault(require("validator"));
const uploadManeger_1 = require("../../lib/uploadManeger");
const hasg_1 = require("../../lib/hasg");
const jwt_1 = require("../../lib/jwt");
const cldUploader_1 = __importDefault(require("../../lib/cldUploader"));
const prisma = new client_1.PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new bson_1.ObjectId();
    const { baio, email, name, password, img } = req.body;
    if (!baio || !email || !name || !password) {
        res.status(400).send({
            err: "All required field must be filled up"
        });
        return;
    }
    if (!validator_1.default.isEmail(email)) {
        res.status(400).send({
            err: 'Enter a valid E-mail'
        });
        return;
    }
    yield prisma.$connect();
    const imgObj = yield (0, uploadManeger_1.uploader)(img);
    prisma.artist.create({
        data: {
            id: `${id}`,
            about: baio,
            email: email,
            name: name,
            password: `${yield (0, hasg_1.hashed)(password)}`,
            profilePic: img ? `${imgObj === null || imgObj === void 0 ? void 0 : imgObj.url}` : null
        }
    }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
        res.send({
            user: data,
            token: yield (0, jwt_1.createToken)(data.id, data.name)
        });
    })).catch((er) => __awaiter(void 0, void 0, void 0, function* () {
        yield cldUploader_1.default.uploader.destroy(imgObj ? imgObj.url : '');
        res.status(400).send(er);
    })).finally(() => {
        prisma.$disconnect();
    });
});
exports.register = register;
