import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()


export const updatePost = async (req: Request, res: Response) => {
    const { id,
        tag,
        prompt,
        negetivePrompt,
        chackPoint,
        lora,
        CFGscale,
        Clip_skip,
        hide,
        nsfw,
        Seed,
        Sampler,
        Steps } = req.body
    if (!id) {
        res.sendStatus(400)
        return
    }
    await prisma.$connect()
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
    }).then(data => res.send(data)).catch(err => res.status(400).send(err)).finally(() => prisma.$disconnect())

}