import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const deleteFavorite = async (req: Request, res: Response) => {
    const { artId, id } = req.body as {
        artId: string, 
        id:string
    }
    try {
        await prisma.$connect()
        prisma.$transaction(async (prisma)=> {
            await prisma.favourite.delete({
                where: {
                    id: `${id}`,
                }
            })
            const res = await prisma.favourite.findMany({
                where: {
                    artId: `${artId}`
                }, select: {
                    id: true,
                    artId: true,
                    artistId:true
                }
            })
            return res
        }, {
            maxWait: 10000,
            timeout: 15000
        })
            .then(data => res.send(data))
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
      
    }

}