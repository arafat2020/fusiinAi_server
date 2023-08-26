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
exports.addToGroup = void 0;
const client_1 = require("@prisma/client");
const sharp_1 = require("../../lib/sharp");
const prisma = new client_1.PrismaClient();
function addToGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const dto = req.body;
        let cmpUrl;
        yield prisma.$connect();
        try {
            const data = prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const isCompressImgRefExist = yield prisma.compressImgRef.findMany({
                    where: {
                        artId: dto.artID
                    }
                });
                if (isCompressImgRefExist.length > 0) {
                    cmpUrl = isCompressImgRefExist[0].compress_url;
                }
                else {
                    const cmp = yield (0, sharp_1.CompressImagUrl)(dto.imgUrl);
                    if (cmp.isSucsess === false) {
                        res.sendStatus(500);
                        return;
                    }
                    cmpUrl = cmp.url;
                }
                yield prisma.compressImgRef.create({
                    data: {
                        artGroupId: dto.artGroupID,
                        compress_url: cmpUrl,
                        artId: dto.artID
                    }
                });
                const group = yield prisma.artGroup.findUnique({
                    where: {
                        id: dto.artGroupID
                    },
                    select: {
                        id: true,
                        name: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                profilePic: true
                            }
                        },
                        imageGroup: {
                            select: {
                                id: true,
                                compress_url: true,
                                ref: {
                                    select: {
                                        id: true,
                                        Artist: {
                                            select: {
                                                id: true,
                                                name: true,
                                                profilePic: true,
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
                return group;
            }));
            res.send(data);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.addToGroup = addToGroup;
