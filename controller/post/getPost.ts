import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getPost = async (req: Request, res: Response) => {
    await prisma.$connect()
    prisma.art.findMany({
        where: {
            hide:{
                not:true
            }
        }
        , select: {
            id: true,
            img: true,
            height: true,
            width: true,
            Artist:{
                select:{
                    id:true,
                    profilePic:true
                }
            },
            react: {
                select: {
                    id: true,
                    type: true,
                    artistId:true
                }
            }
        },
        orderBy:{
            id:'desc'
        },
        take:20
    }).then(data => res.send(data)).catch(err => res.status(404).send(err)).finally(() => prisma.$disconnect())
}