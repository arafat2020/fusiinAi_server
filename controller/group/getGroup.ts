import { Request, Response } from "express";
import { GetGroupCredential } from "../../interface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getGroup(req: Request, res: Response){
    const dto = req.body as GetGroupCredential
    await prisma.$connect()
    try {
        const group = await prisma.artGroup.findUnique({
            where:{
                id:dto.artGroupID
            },
            select:{
                id:true,
                name:true,
                user:{
                    select:{
                        id:true,
                        name:true,
                        profilePic:true
                    }
                },
                imageGroup:{
                    select:{
                        id:true,
                        compress_url:true,
                        ref:{
                            select:{
                                id:true,
                                Artist:{
                                    select:{
                                        id:true,
                                        name:true,
                                        profilePic:true,
                                    }
                                }
                            }
                        }
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