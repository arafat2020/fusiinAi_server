import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getPopularUser = async (req: Request, res: Response) => {
    await prisma.$connect()
    try {
        const data = await prisma.artist.findMany(
            {
                take: 10,
               
            }
        )
        res.send(data)
    } catch (error) {
        res.status(404).send(error)
    }
}