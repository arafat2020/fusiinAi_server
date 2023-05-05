import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getSinglePost = async (req: Request, res: Response) => {
    const { artId } = req.body
    await prisma.$connect()
    prisma.art.findUnique({
        where:{
            id:artId
        }
    }).then(data => res.send(data)).catch(err => res.status(404).send(err)).finally(() => prisma.$disconnect())

}