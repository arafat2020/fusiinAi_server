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
exports.postCmt = void 0;
const client_1 = require("@prisma/client");
const bson_1 = require("bson");
const prisma = new client_1.PrismaClient();
const postCmt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new bson_1.ObjectId();
    const { artId, comment, decoded } = req.body;
    if (!artId || !comment) {
        res.sendStatus(400);
        return;
    }
    yield prisma.$connect();
    prisma.comment.create({
        data: {
            id: `${id}`,
            artId: artId,
            artistId: decoded.data.id,
            commet: comment
        }, select: {
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
        }
    }).then(data => res.send(data)).catch(err => res.status(400).send(err));
});
exports.postCmt = postCmt;
