import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getPost = async (req: Request, res: Response) => {
    const {skip} = req.query
    await prisma.$connect()
    prisma.$transaction([
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
            take:20,
            skip:skip?parseInt(`${skip}`):0
        }),
        prisma.art.count({
            where:{
                hide:{
                    not:true
                }
            }
        })
    ])
    .then(data => res.send(data)).catch(err => res.status(404).send(err))
}