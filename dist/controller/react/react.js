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
exports.reactOp = void 0;
const client_1 = require("@prisma/client");
const bson_1 = require("bson");
const prisma = new client_1.PrismaClient();
const reactOp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new bson_1.ObjectId();
    const { decoded, artId, type } = req.body;
    if (!artId || !type) {
        res.sendStatus(400);
        return;
    }
    console.time('c');
    const isReacted = yield prisma.react.findMany({
        where: {
            artistId: decoded.data.id,
            artId: artId
        }
    });
    if (isReacted.length === 0) {
        yield prisma.react.create({
            data: {
                id: `${id}`,
                artId: artId,
                artistId: decoded.data.id,
                type: type ? type : 'like'
            }
        });
        yield prisma.art.findUnique({
            where: {
                id: artId
            }, select: {
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
            }
        }).then(data => {
            console.timeEnd('c');
            res.send(data);
        }).catch(err => res.status(400).send(err)).finally(() => prisma.$disconnect());
        return;
    }
    if (isReacted.length !== 0) {
        if (isReacted[0].type === type) {
            yield prisma.react.delete({
                where: {
                    id: isReacted[0].id
                }
            });
            yield prisma.art.findUnique({
                where: {
                    id: artId
                }, select: {
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
                }
            }).then(data => {
                console.timeEnd('c');
                res.send(data);
            }).catch(err => res.status(400).send(err)).finally(() => prisma.$disconnect());
            return;
        }
        else {
            yield prisma.react.update({
                where: {
                    id: isReacted[0].id,
                }, data: {
                    type: type
                }
            });
            yield prisma.art.findUnique({
                where: {
                    id: artId
                }, select: {
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
                }
            }).then(data => {
                console.timeEnd('c');
                res.send(data);
            }).catch(err => res.status(400).send(err)).finally(() => prisma.$disconnect());
            return;
        }
    }
    console.timeEnd('c');
});
exports.reactOp = reactOp;
