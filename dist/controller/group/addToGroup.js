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
const bson_1 = require("bson");
const prisma = new client_1.PrismaClient();
function addToGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { artGroupID, artID, imgUrl, uuid } = req.body;
        if (!artGroupID
            || !artID
            || !imgUrl
            || !uuid) {
            res.sendStatus(400);
            return;
        }
        try {
            yield prisma.$connect();
            const isExist = yield prisma.group.findMany({
                where: {
                    artId: artID,
                    artGroupId: artGroupID
                }
            });
            if (isExist.length > 0) {
                if (isExist.length > 1) {
                    yield prisma.group.delete({
                        where: {
                            id: isExist[0].id
                        }
                    });
                }
                res.status(400).send({ msg: "Already added" });
                return;
            }
            else {
                const id = new bson_1.ObjectId();
                const artGroup = yield prisma.group.create({
                    data: {
                        id: `${id}`,
                        artId: artID,
                        artGroupId: artGroupID,
                        uuid: uuid
                    }, select: {
                        ArtGroup: {
                            select: {
                                id: true,
                                name: true,
                                Group: {
                                    where: {
                                        id: `${id}`
                                    }, select: {
                                        id: true,
                                        artId: true
                                    }
                                }
                            }
                        }
                    }
                });
                res.send(artGroup);
            }
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.addToGroup = addToGroup;
