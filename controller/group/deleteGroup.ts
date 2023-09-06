import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export async function deleteGRoup(req: Request, res: Response) {
    const { id } = await req.body
    if (!id) {
        res.sendStatus(400)
        return
    }
    try {
        await prisma.$connect()
        const dl = await prisma.artGroup.delete({
            where: {
                id: id,
            }
        })
        res.send(dl)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}