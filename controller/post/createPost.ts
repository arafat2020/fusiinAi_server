import { PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";
import { Request, Response } from "express";
import { uploader } from "../../lib/uploadManeger";

const prisma = new PrismaClient()

export const createPost = async (req: Request, res: Response) => {
    const id = new ObjectId()
    const { img,
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
    const { decoded } = req.body
    if (!img || !tag) {
        res.status(400).send({
            err: 'All required field must be included'
        })
        return
    }
    const imgObj = await uploader(img)
    await prisma.$connect()
    prisma.art.create({
        data: {
            id: `${id}`,
            img: `${imgObj?.url}`,
            width: Number(imgObj?.width),
            height: Number(imgObj?.height),
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
    }).then(data => res.send(data)).catch(err => res.status(400).send(err)).finally(() => prisma.$disconnect())
}