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
exports.uploader = void 0;
const cldUploader_1 = __importDefault(require("./cldUploader"));
// import imageSize from "image-size"
const uploader = (url) => __awaiter(void 0, void 0, void 0, function* () {
    if (!url)
        return null;
    try {
        const Cls = yield cldUploader_1.default.uploader.upload(url);
        const data = {
            url: Cls.url,
            width: Cls.width,
            height: Cls.height
        };
        return data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.uploader = uploader;
