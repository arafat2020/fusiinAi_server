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
exports.setNotice = void 0;
const redis_1 = require("../../lib/redis");
function setNotice(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, redis_1.creatNotificarion)({
            id: 'afafgf',
            seen: false,
            userId: 'dsgaedaedf',
            url: 'fasdfgasgS',
            time: Date.now().toString(),
            notification: {
                actuserId: 'dgsdfgsdfg',
                actUserName: 'arafat',
                actUserPic: 'dfSFSFSF',
                actType: 'comment',
                msg: 'zdfgdgZDgdg'
            }
        });
        res.send(data);
    });
}
exports.setNotice = setNotice;
