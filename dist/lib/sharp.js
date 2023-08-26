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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressImagUrl = void 0;
const axios_1 = __importDefault(require("axios"));
const sharp_1 = __importDefault(require("sharp"));
const uploadManeger_1 = require("./uploadManeger");
function CompressImagUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const imgBuffer = yield axios_1.default.get(url, { responseType: 'arraybuffer' });
            const imageBuffer = yield Buffer.from(imgBuffer.data, 'binary');
            const data = yield (0, sharp_1.default)(imageBuffer).png({ quality: 30 }).toBuffer();
            const base64String = yield data.toString('base64');
            const cld = yield (0, uploadManeger_1.uploader)(`data:image/png;base64,${base64String}`);
            if (cld === null || cld === void 0 ? void 0 : cld.url) {
                return {
                    isSucsess: true,
                    url: cld === null || cld === void 0 ? void 0 : cld.url
                };
            }
            else {
                return {
                    isSucsess: false,
                    url: 'NOTE_FOUND'
                };
            }
        }
        catch (error) {
            console.log(error);
            return {
                isSucsess: false,
                url: 'FAILED'
            };
        }
    });
}
exports.CompressImagUrl = CompressImagUrl;
