import { Request, Response } from "express";
import { AddtoGroupCredentila } from "../../interface";
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";

const prisma = new PrismaClient()

export async function addToGroup(req: Request, res: Response) {
    const { artGroupID, artID,imgUrl,uuid } = req.body as AddtoGroupCredentila
    if (!artGroupID
        || !artID
        || !imgUrl
        || !uuid
    ) {
        res.sendStatus(400)
        return
    }
    try {
        await prisma.$connect()
  
            const isExist = await prisma.group.findMany({
                where: {
                    artId: artID,
                    artGroupId: artGroupID
                }
            })
            if (isExist.length > 0) {
                if (isExist.length>1) {
                    await prisma.group.delete({
                        where:{
                            id:isExist[0].id
                        }
                    })
                }
                res.status(400).send({ msg: "Already added" })
                return
            }
            else {
                const id = new ObjectId()
                const artGroup = await prisma.group.create({
                    data:{
                        id:`${id}`,
                        artId:artID,
                        artGroupId:artGroupID,
                        uuid:uuid
                    },select:{
                        ArtGroup:{
                            select:{
                                id:true,
                                name:true,
                                Group:{
                                    where:{
                                        id:`${id}`
                                    },select:{
                                        id:true,
                                        artId:true
                                    }
                                }
                            }
                        }
                    }
                    
                })
                res.send(artGroup)

            }
       
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

}