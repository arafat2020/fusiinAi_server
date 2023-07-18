import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export async function searchPost(req: Request, res: Response) {
    try {
        const { term, skip, nsfw } = req.query
        console.log(term);
        await prisma.$connect()
        const searchReasult = await prisma.art.findMany({
            where: {
                tag: {
                    contains: `${term}`
                },
                nsfw: {
                    not: Boolean(nsfw)
                }
            },
            select: {
                id: true,
                img: true,
                height: true,
                width: true,
                Artist: {
                    select: {
                        id: true,
                        profilePic: true
                    }
                },
                react: {
                    select: {
                        id: true,
                        type: true,
                        artistId: true
                    }
                }
            },
            take: 20,
            skip: skip ? parseInt(`${skip}`) : 0
        })
        res.send(searchReasult)
    } catch (error) {
        res.status(500).send({
            msg: 'Something went wring',
            err: error
        })
    }
}