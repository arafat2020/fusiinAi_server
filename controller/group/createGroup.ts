import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { GroupArtcredential } from "../../interface";

const prisma = new PrismaClient()
export async function createGorupo(req: Request, res: Response) {
    const { decoded, name } = req.body as GroupArtcredential
    await prisma.$connect()
    try {
        const newGroup = await prisma.artGroup.create({
            data: {
                name: name,
                artistId: decoded.data.id
            },
            select: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        profilePic: true
                    }
                },
                name: true,
                imageGroup: true
            }
        })
        res.send(newGroup)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)

    }

}