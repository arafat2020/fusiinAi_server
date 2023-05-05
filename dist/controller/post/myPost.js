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
Object.defineProperty(exports, "__esModule", { value: true });
exports.myPost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const myPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { decoded } = req.body;
    try {
        yield prisma.$connect();
        prisma.art.findMany({
            where: {
                artistId: `${decoded.data.id}`
            },
            select: {
                id: true,
                img: true,
                width: true,
                height: true,
                react: true,
            },
            orderBy: {
                id: 'desc'
            }
        }).then(data => res.send(data)).catch(err => res.status(404).send(err))
            .finally(() => prisma.$disconnect());
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.myPost = myPost;
