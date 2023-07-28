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
exports.deleteFavorite = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const deleteFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { artId, id } = req.body;
    try {
        yield prisma.$connect();
        prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.favourite.delete({
                where: {
                    id: `${id}`,
                }
            });
            const res = yield prisma.favourite.findMany({
                where: {
                    artId: `${artId}`
                }, select: {
                    id: true,
                    artId: true,
                    artistId: true
                }
            });
            return res;
        }), {
            maxWait: 10000,
            timeout: 15000
        })
            .then(data => res.send(data));
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});
exports.deleteFavorite = deleteFavorite;
