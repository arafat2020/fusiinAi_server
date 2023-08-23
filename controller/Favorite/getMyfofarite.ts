import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prism = new PrismaClient()

export async function getMyFovarite(req: Request, res: Response) {
    const { decoded } = req.body as {
        decoded: {
            data: {
                id: string
            }
        }
    }
    if (decoded) {
        try {
            const data = await prism.favourite.findMany({
                where:{
                    artistId:decoded.data.id
                },select:{
                    artistId:true,
                    Art:{
                        select:{
                            id:true,
                            img:true,
                            react:{
                                select:{
                                    id:true,
                                    type:true
                                }
                            },
                            Artist:{
                                select:{
                                    id:true,
                                    name:true,
                                    profilePic:true
                                }
                            }
                        }
                    }
                }
            })

            res.send(data)
        } catch (error) {
            res.sendStatus(500)
        }
    } else {
        res.sendStatus(400)
    }
}