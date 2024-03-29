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
exports.getMyGroup = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getMyGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const dto = req.body;
        yield prisma.$connect();
        try {
            const group = yield prisma.artGroup.findMany({
                where: {
                    artistId: dto.decoded.data.id
                },
                select: {
                    id: true,
                    name: true,
                    published: true,
                    Artist: {
                        select: {
                            id: true,
                            name: true,
                            profilePic: true
                        }
                    },
                    Group: {
                        select: {
                            id: true,
                            Art: {
                                select: {
                                    id: true,
                                    img: true,
                                    cmp: true,
                                    tag: true,
                                    Artist: {
                                        select: {
                                            id: true,
                                            name: true,
                                            profilePic: true
                                        }
                                    },
                                    react: {
                                        select: {
                                            id: true,
                                            type: true
                                        }
                                    }
                                }
                            }
                        },
                        orderBy: {
                            id: 'desc'
                        }
                    }
                }
            });
            res.send(group);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.getMyGroup = getMyGroup;
