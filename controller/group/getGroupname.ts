import { Request, Response } from "express";
import { Decoded, GetGroupCredential } from "../../interface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getGroupName(req: Request, res: Response) {
    const { decoded, artID } = await req.body as {
        decoded: Decoded,
        artID: string
    }
    console.log(decoded);

    try {
        await prisma.$connect()
        const groupNames = await prisma.artGroup.findMany({
            where: {
                artistId: decoded.data.id
            },
            select: {
                id: true,
                name: true,
                Group:{
                    where:{
                        artId:artID
                    },select:{
                        id:true,
                        artId:true
                    }
                }

            },
            orderBy: {
                id: 'desc'
            }
        })
        
        res.send(groupNames)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}