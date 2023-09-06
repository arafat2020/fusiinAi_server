import { Request, Response } from "express";
import { Decoded, GetGroupCredential } from "../../interface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getMyGroup(req: Request, res: Response){
    const dto = req.body as {
        decoded:Decoded,
    }
    await prisma.$connect()
    try {
        const group = await prisma.artGroup.findMany({
            where:{
                artistId:dto.decoded.data.id
            },
            select:{
                id:true,
                name:true,
                published:true,
                Artist:{
                    select:{
                        id:true,
                        name:true,
                        profilePic:true
                    }
                },
                Group:{
                    select:{
                        id:true,
                        Art:{
                            select:{
                                id:true,
                                img:true,
                                cmp:true,
                                tag:true,
                                Artist:{
                                    select:{
                                        id:true,
                                        name:true,
                                        profilePic:true
                                    }
                                },
                                react:{
                                    select:{
                                        id:true,
                                        type:true
                                    }
                                }
                            }
                        }
                    },
                    orderBy:{
                        id:'desc'
                    }
                }
            }
        })
        res.send(group)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}