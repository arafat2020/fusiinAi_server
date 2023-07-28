import { PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const addToFavorte = async (req: Request, res: Response) => {
    const { artId, decoded } = req.body as {
        artId: string, decoded: {
            data: {
                id: string
            }
        }
    }
    const id = new ObjectId()
    try {
        await prisma.$connect()
        prisma.favourite.create({
            data: {
                id:`${id}`,
                artId: `${artId}`,
                artistId:`${decoded.data.id}`
            }, select: {
                id: true,
                artId: true,
                artistId:true
            }
        })
            .then(data => res.send(data))
    } catch (error) {
        console.log(error);
        
        res.status(400).send(error)
        
    }

}