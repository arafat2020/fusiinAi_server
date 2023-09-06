import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export async function removeFromFroup(req: Request, res: Response){
    const {artGroupID,id} = req.body as {
        artGroupID:string,
        id:string
    }
    if (!artGroupID
        || !id
        
    ) {
        res.sendStatus(400)
        return
    }
    try {
        await prisma.$connect()
        const dl = await prisma.$transaction(async prisma=>{
            const isExist = await prisma.group.findUnique({
                where:{
                    id:id,
                    artGroupId:artGroupID
                }
            })
            if (isExist?.id) {
                await prisma.group.delete({
                    where:{
                        id:id
                    }
                })
                const artGroup = await prisma.artGroup.findUnique({
                    where:{
                        id:artGroupID
                    },
                    select:{
                        id:true,
                        name:true
                    }
                })
                return artGroup
            }
            res.status(400).send("Record not found")
        })
        res.send(dl)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}
