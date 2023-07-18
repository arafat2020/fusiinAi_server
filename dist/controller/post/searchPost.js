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
exports.searchPost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function searchPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { term, skip, nsfw } = req.query;
            yield prisma.$connect();
            const searchReasult = yield prisma.art.findMany({
                where: {
                    tag: {
                        startsWith: `${term}`
                    },
                    nsfw: {
                        not: nsfw ? true : false
                    }
                },
                select: {
                    id: true,
                    img: true,
                    height: true,
                    width: true,
                    tag: true,
                    Artist: {
                        select: {
                            id: true,
                            profilePic: true
                        }
                    },
                    react: {
                        select: {
                            id: true,
                            type: true,
                            artistId: true
                        }
                    }
                },
                take: 20,
                skip: skip ? parseInt(`${skip}`) : 0
            });
            res.send(searchReasult);
        }
        catch (error) {
            res.status(500).send({
                msg: 'Something went wring',
                err: error
            });
        }
    });
}
exports.searchPost = searchPost;
