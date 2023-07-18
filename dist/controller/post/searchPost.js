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
exports.searchPost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function searchPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { term, skip, nsfw } = req.query;
        yield prisma.$connect();
        prisma.art.findMany({
            where: {
                hide: {
                    not: true
                },
                tag: {
                    contains: `${term}`
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
            skip: skip ? parseInt(`${skip}`) : 0,
            take: 20
        }).then(data => res.send(data)).catch(err => res.status(404).send(err)).finally(() => prisma.$disconnect());
    });
}
exports.searchPost = searchPost;
