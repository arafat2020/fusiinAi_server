import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getSinglePost = async (req: Request, res: Response) => {
    const { artId } = req.query
    await prisma.$connect()
    prisma.$transaction([
        prisma.art.findUnique({
            where: {
                id: `${artId}`
            },
            select: {
                id: true,
                img: true,
                tag: true,
                Artist: {
                    select: {
                        id: true,
                        profilePic: true
                    }
                }
            }
        }),
        prisma.comment.findMany({
            where: {
                artId: `${artId}`
            },
            select: {
                id: true,
                commet: true,
                date: true,
                Artist: {
                    select: {
                        id: true,
                        profilePic: true,
                        name: true
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        })
        ,
        prisma.react.count({
            where: {
                artId: `${artId}`,
                type: 'like'
            }
        }),
        prisma.react.count({
            where: {
                artId: `${artId}`,
                type: 'love'
            }
        }),
        prisma.react.count({
            where: {
                artId: `${artId}`,
                type: 'dislike'
            }
        }),
        prisma.react.findMany({
            where: {
                artId: `${artId}`
            }
        }),
        prisma.react.findMany({
            where: {
                artId: `${artId}`
            },
            select: {
                id: true,
                type: true,
                artistId: true
            }
        }),
        prisma.favourite.findMany({
            where: {
                artId: `${artId}`
            }, select: {
                id: true,
                artistId: true,
                artId:true,
            },
            orderBy:{
                id:'desc'
            }
        })
    ])
        .then(data => res.send(data)).catch(err => res.status(404).send(err))

}