import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getUser = async (req: Request, res: Response) => {
    const { decoded } = req.body
    await prisma.$connect()
    prisma.artist.findUnique({
        where: {
            id: decoded.data.id
        }
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(400).send(err)
    }).finally(() => prisma.$disconnect())
}