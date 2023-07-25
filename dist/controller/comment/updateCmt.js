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
exports.updateCmt = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const updateCmt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { decoded, cmtId, comment } = req.body;
    if (!cmtId || !comment) {
        res.sendStatus(400);
        return;
    }
    yield prisma.$connect();
    prisma.comment.update({
        where: {
            id: cmtId
        }, data: {
            commet: comment
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
        }
    }).then(data => res.send(data)).catch(err => res.status(400).send(err));
});
exports.updateCmt = updateCmt;
