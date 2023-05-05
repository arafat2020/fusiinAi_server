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
exports.updatePost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, tag, prompt, negetivePrompt, chackPoint, lora, CFGscale, Clip_skip, hide, nsfw, Seed, Sampler, Steps } = req.body;
    if (!id) {
        res.sendStatus(400);
        return;
    }
    yield prisma.$connect();
    prisma.art.update({
        where: {
            id: id
        },
        data: {
            tag: tag,
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
            Steps: Number(Steps)
        }
    }).then(data => res.send(data)).catch(err => res.status(400).send(err)).finally(() => prisma.$disconnect());
});
exports.updatePost = updatePost;
