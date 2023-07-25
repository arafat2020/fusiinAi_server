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
exports.postReact = void 0;
const client_1 = require("@prisma/client");
const bson_1 = require("bson");
const prisma = new client_1.PrismaClient();
function postReact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { decoded, artId, type } = req.body;
        const id = new bson_1.ObjectId();
        if (!artId || !type) {
            res.sendStatus(400);
            return;
        }
        yield prisma.$connect();
        yield prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
            const isReacted = yield tx.react.findMany({
                where: {
                    artistId: decoded.data.id,
                    artId: artId,
                },
            });
            if (isReacted.length === 0) {
                yield tx.react.create({
                    data: {
                        id: `${id}`,
                        artId: artId,
                        artistId: decoded.data.id,
                        type: type ? type : 'like',
                    },
                });
            }
            else {
                if (isReacted[0].type === type) {
                    yield tx.react.delete({
                        where: {
                            id: isReacted[0].id,
                        },
                    });
                }
                else {
                    yield tx.react.update({
                        where: {
                            id: isReacted[0].id,
                        },
                        data: {
                            type: type,
                        },
                    });
                }
            }
        }), {
            maxWait: 10000,
            timeout: 15000
        });
        prisma.$transaction([
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
            })
        ]).then(count => res.send(count)).catch(err => res.status(500).send(err));
    });
}
exports.postReact = postReact;
