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
exports.getGroupName = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getGroupName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { decoded, artID } = yield req.body;
        console.log(decoded);
        try {
            yield prisma.$connect();
            const groupNames = yield prisma.artGroup.findMany({
                where: {
                    artistId: decoded.data.id
                },
                select: {
                    id: true,
                    name: true,
                    Group: {
                        where: {
                            artId: artID
                        }, select: {
                            id: true,
                            artId: true
                        }
                    }
                },
                orderBy: {
                    id: 'desc'
                }
            });
            res.send(groupNames);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.getGroupName = getGroupName;
