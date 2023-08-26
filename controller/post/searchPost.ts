import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export async function searchPost(req: Request, res: Response) {
    const { term, skip, nsfw } = req.query
    await prisma.$connect()
    prisma.art.findMany({
        where: {
            hide: {
                not: true
            },
            tag: {
                contains: `${term}`
            }
        }
        , select: {
            id: true,
            img: true,
            height: true,
            width: true,
            createdAt:true,
            Artist: {
                select: {
                    id: true,
                    profilePic: true,
                    name:true
                }
            },
            react: {
                select: {
                    id: true,
                    type: true,
                    artistId: true
                }
            },
            comment: {
                take: 1
                , select: {
                    id: true,
                    date: true,
                    commet: true,
                    Artist: {
                        select: {
                            id: true,
                            profilePic: true,
                            name: true
                        }
                    }
                }
            }

        },

        orderBy: {
            id: 'desc'
        },
        skip: skip ? parseInt(`${skip}`) : 0,
        take: 20
    }).then(data => res.send(data)).catch(err => res.status(404).send(err))
}