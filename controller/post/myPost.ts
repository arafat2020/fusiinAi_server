import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const myPost = async (req: Request, res: Response) => {
    const { decoded } = req.body
     
    try {
        await prisma.$connect()
        prisma.art.findMany({
            where: {
                artistId: `${decoded.data.id}`
            },
            select:{
                id:true,
                img:true,
                tag:true,
                width:true,
                height:true,
                react:true,
            },
            orderBy:{
                id:'desc'
            }
        }).then(data => res.send(data)
        ).catch(err => res.status(404).send(err))
            .finally(() => prisma.$disconnect())
    } catch (error) {
        res.sendStatus(500)
    }
}