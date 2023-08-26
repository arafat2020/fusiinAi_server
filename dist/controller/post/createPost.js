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
exports.createPost = void 0;
const client_1 = require("@prisma/client");
const bson_1 = require("bson");
const uploadManeger_1 = require("../../lib/uploadManeger");
const prisma = new client_1.PrismaClient();
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new bson_1.ObjectId();
    const { img, tag, prompt, negetivePrompt, chackPoint, lora, CFGscale, Clip_skip, hide, nsfw, Seed, Sampler, Steps } = req.body;
    const { decoded } = req.body;
    if (!img || !tag) {
        res.status(400).send({
            err: 'All required field must be included'
        });
        return;
    }
    const imgObj = yield (0, uploadManeger_1.uploader)(img);
    yield prisma.$connect();
    prisma.art.create({
        data: {
            id: `${id}`,
            img: `${imgObj === null || imgObj === void 0 ? void 0 : imgObj.url}`,
            width: Number(imgObj === null || imgObj === void 0 ? void 0 : imgObj.width),
            height: Number(imgObj === null || imgObj === void 0 ? void 0 : imgObj.height),
            tag: tag,
            artistId: decoded.data.id,
            prompt: prompt && prompt,
            negetivePrompt: negetivePrompt && negetivePrompt,
            chackPoint: chackPoint,
            lora: lora,
            CFGscale: Number(CFGscale),
            Clip_skip: Number(Clip_skip),
            hide: hide ? true : false,
            nsfw: nsfw ? true : false,
            Seed: Number(Seed),
            Sampler: Sampler,
            Steps: Number(Steps),
        }
    }).then(data => res.send(data)).catch(err => res.status(400).send(err)).finally(() => prisma.$disconnect());
});
exports.createPost = createPost;
