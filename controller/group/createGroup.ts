import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { GroupArtcredential } from "../../interface";

const prisma = new PrismaClient()
export async function createGorupo(req: Request, res: Response) {
    const { decoded, name } = await req.body as GroupArtcredential
    try {
        await prisma.$connect()
        const newGroup = await prisma.artGroup.create({
            data: {
                name: name,
                artistId: decoded.data.id
            },
            select: {
                id:true,
                name: true,
                
            }
        })
        res.send(newGroup)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)

    }

}