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
exports.deleteGRoup = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function deleteGRoup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = yield req.body;
        if (!id) {
            res.sendStatus(400);
            return;
        }
        try {
            yield prisma.$connect();
            const dl = yield prisma.artGroup.delete({
                where: {
                    id: id,
                }
            });
            res.send(dl);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.deleteGRoup = deleteGRoup;
