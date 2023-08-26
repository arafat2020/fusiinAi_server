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
exports.getMyFovarite = void 0;
const client_1 = require("@prisma/client");
const prism = new client_1.PrismaClient();
function getMyFovarite(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { decoded } = req.body;
        if (decoded) {
            try {
                const data = yield prism.favourite.findMany({
                    where: {
                        artistId: decoded.data.id
                    }, select: {
                        id: true,
                        artistId: true,
                        Art: {
                            select: {
                                id: true,
                                img: true,
                                react: {
                                    select: {
                                        id: true,
                                        type: true
                                    }
                                },
                                Artist: {
                                    select: {
                                        id: true,
                                        name: true,
                                        profilePic: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: {
                        id: 'desc'
                    }
                });
                res.send(data);
            }
            catch (error) {
                res.sendStatus(500);
            }
        }
        else {
            res.sendStatus(400);
        }
    });
}
exports.getMyFovarite = getMyFovarite;
