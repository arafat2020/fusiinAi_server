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
exports.getSinglePost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { artId } = req.query;
    yield prisma.$connect();
    prisma.$transaction([
        prisma.art.findUnique({
            where: {
                id: `${artId}`
            },
            select: {
                id: true,
                img: true,
                tag: true,
                createdAt: true,
                Artist: {
                    select: {
                        id: true,
                        profilePic: true
                    }
                }
            }
        }),
        prisma.comment.findMany({
            where: {
                artId: `${artId}`
            },
            select: {
                id: true,
                commet: true,
                date: true,
                Artist: {
                    select: {
                        id: true,
                        profilePic: true,
                        name: true
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        }),
        prisma.react.count({
            where: {
                artId: `${artId}`,
                type: 'like'
            }
        }),
        prisma.react.count({
            where: {
                artId: `${artId}`,
                type: 'love'
            }
        }),
        prisma.react.count({
            where: {
                artId: `${artId}`,
                type: 'dislike'
            }
        }),
        prisma.react.findMany({
            where: {
                artId: `${artId}`
            }
        }),
        prisma.react.findMany({
            where: {
                artId: `${artId}`
            },
            select: {
                id: true,
                type: true,
                artistId: true
            }
        }),
        prisma.favourite.findMany({
            where: {
                artId: `${artId}`
            }, select: {
                id: true,
                artistId: true,
                artId: true,
            },
            orderBy: {
                id: 'desc'
            }
        })
    ])
        .then(data => res.send(data)).catch(err => res.status(404).send(err));
});
exports.getSinglePost = getSinglePost;
