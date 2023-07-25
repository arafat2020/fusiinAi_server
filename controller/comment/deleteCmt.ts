import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const deleteCmt = async (req: Request, res: Response) => {
    const { cmtID } = req.body
    if (!cmtID) {
        res.sendStatus(400)
        return
    }
    await prisma.$connect()
    prisma.comment.delete({
        where: {
            id: cmtID
        }
    }).then(data => res.send(data)).catch(err => res.status(400).send(err))
}