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
exports.deletPoat = void 0;
const client_1 = require("@prisma/client");
const cldUploader_1 = __importDefault(require("../../lib/cldUploader"));
const prisma = new client_1.PrismaClient();
const deletPoat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, img, decoded } = req.body;
    if (!id || !img) {
        res.sendStatus(400);
        return;
    }
    yield cldUploader_1.default.uploader.destroy(img, () => console.log("destroyed")).catch(err => console.log(err));
    yield prisma.$connect();
    prisma.art.delete({
        where: {
            id: id
        }
    }).then(() => __awaiter(void 0, void 0, void 0, function* () {
        const nData = yield prisma.art.findMany({
            where: {
                artistId: `${decoded.data.id}`
            },
            select: {
                id: true,
                img: true,
                width: true,
                height: true,
                react: true,
            }
        });
        res.send(nData);
    })).catch(err => res.status(400).send(err));
});
exports.deletPoat = deletPoat;
