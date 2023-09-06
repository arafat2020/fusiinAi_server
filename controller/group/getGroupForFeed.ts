import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient()
export async function getGroupForFedd(req: Request, res: Response){
    try {
        await prisma.$connect()
        const data = await prisma.artGroup.findMany({
            where:{
                published:true
            },
            take:3,
            orderBy:{
                Group:{
                    _count:"asc"
                }
            },select:{
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
        res.send(data)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}