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
exports.testCmp = void 0;
const client_1 = require("@prisma/client");
const sharp_1 = require("../../lib/sharp");
const prisma = new client_1.PrismaClient();
const testCmp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const NullArt = [];
    const arts = yield prisma.art.findMany({});
    yield arts.map(art => {
        if (art.cmp === null)
            NullArt.push(art);
    });
    // res.send(NullArt)
    for (let index = 0; index < NullArt.length; index++) {
        if (NullArt[index].cmp === null) {
            const cpm = yield (0, sharp_1.CompressImagUrl)(NullArt[index].img);
            const updt = yield prisma.art.update({
                where: {
                    id: NullArt[index].id
                }, data: {
                    cmp: cpm.isSucsess ? cpm.url : null
                }
            });
            console.log(updt, index, NullArt.length);
        }
    }
    // arts.map(async (art, i) => {
    //     if (art.cmp === null) {
    //         
    //         const updtArt = prisma.art.update({
    //             where: {
    //                 id: art.id
    //             }, data: {
    //                 cmp: cpm.isSucsess ? cpm.url : null
    //             }
    //         })
    //         console.log(i, updtArt);
    //     }
    // })
});
exports.testCmp = testCmp;
