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
exports.deleteCmt = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const deleteCmt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cmtID } = req.body;
    if (!cmtID) {
        res.sendStatus(400);
        return;
    }
    yield prisma.$connect();
    prisma.comment.delete({
        where: {
            id: cmtID
        }
    }).then(data => res.send(data)).catch(err => res.status(400).send(err));
});
exports.deleteCmt = deleteCmt;
