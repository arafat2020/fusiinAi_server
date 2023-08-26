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
exports.compressImgeUrl = void 0;
const sharp_1 = require("../../lib/sharp");
function compressImgeUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { url } = req.body;
        if (url) {
            const data = yield (0, sharp_1.CompressImagUrl)(url);
            res.send(data);
        }
        else {
            res.status(400).send('bad requist');
        }
    });
}
exports.compressImgeUrl = compressImgeUrl;
