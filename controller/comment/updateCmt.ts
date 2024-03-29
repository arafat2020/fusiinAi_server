import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()


export const updateCmt = async (req: Request, res: Response) => {
    const { decoded, cmtId, comment } = req.body
    if (!cmtId || !comment) {
        res.sendStatus(400)
        return
    }
    await prisma.$connect()
    prisma.comment.update({
        where: {
            id: cmtId
        }, data: {
            commet: comment
        },
        select: {
            id: true,
            commet: true,
            date: true,
            Artist: {
                select: {
                    id: true,
                    profilePic: true,
                    name:true
                }
            }
        }
    }).then(data => res.send(data)).catch(err => res.status(400).send(err))
}