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
exports.addToFavorte = void 0;
const client_1 = require("@prisma/client");
const bson_1 = require("bson");
const prisma = new client_1.PrismaClient();
const addToFavorte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { artId, decoded } = req.body;
    const id = new bson_1.ObjectId();
    try {
        yield prisma.$connect();
        prisma.favourite.create({
            data: {
                id: `${id}`,
                artId: `${artId}`,
                artistId: `${decoded.data.id}`
            }, select: {
                id: true,
                artId: true,
                artistId: true
            }
        })
            .then(data => res.send(data));
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});
exports.addToFavorte = addToFavorte;
