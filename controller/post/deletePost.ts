import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import cld from "../../lib/cldUploader";

const prisma = new PrismaClient()


export const deletPoat = async (req: Request, res: Response) => {
    const { id,img,decoded } = req.body
    if (!id || !img) {
        res.sendStatus(400)
        return
    }
    await cld.uploader.destroy(img,()=>console.log("destroyed"))
    await prisma.$connect()
    prisma.art.delete({
        where: {
            id: id
        }
    }).then(async() => {
        const nData = await prisma.art.findMany({
            where: {
                artistId: `${decoded.data.id}`
            },
            select:{
                id:true,
                img:true,
                width:true,
                height:true,
                react:true,
            }
        }) 
        res.send(nData)
    }
    ).catch(err => res.status(400).send(err)).finally(() => prisma.$disconnect())
}