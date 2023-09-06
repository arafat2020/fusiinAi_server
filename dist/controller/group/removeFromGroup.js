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
exports.removeFromFroup = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function removeFromFroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { artGroupID, id } = req.body;
        if (!artGroupID
            || !id) {
            res.sendStatus(400);
            return;
        }
        try {
            yield prisma.$connect();
            const dl = yield prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const isExist = yield prisma.group.findUnique({
                    where: {
                        id: id,
                        artGroupId: artGroupID
                    }
                });
                if (isExist === null || isExist === void 0 ? void 0 : isExist.id) {
                    yield prisma.group.delete({
                        where: {
                            id: id
                        }
                    });
                    const artGroup = yield prisma.artGroup.findUnique({
                        where: {
                            id: artGroupID
                        },
                        select: {
                            id: true,
                            name: true
                        }
                    });
                    return artGroup;
                }
                res.status(400).send("Record not found");
            }));
            res.send(dl);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.removeFromFroup = removeFromFroup;
