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
exports.getPost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip } = req.query;
    yield prisma.$connect();
    prisma.$transaction([
        prisma.art.findMany({
            where: {
                hide: {
                    not: true
                }
            },
            select: {
                id: true,
                img: true,
                height: true,
                width: true,
                Artist: {
                    select: {
                        id: true,
                        profilePic: true
                    }
                },
                react: {
                    select: {
                        id: true,
                        type: true,
                        artistId: true
                    }
                }
            },
            orderBy: {
                id: 'desc'
            },
            take: 20,
            skip: skip ? parseInt(`${skip}`) : 0
        }),
        prisma.art.count()
    ])
        .then(data => res.send(data)).catch(err => res.status(404).send(err)).finally(() => prisma.$disconnect());
});
exports.getPost = getPost;
