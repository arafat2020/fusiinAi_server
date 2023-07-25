import { PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";
import { Request, Response } from "express";

const prisma = new PrismaClient()


export const postCmt = async (req: Request, res: Response) => {
    const id = new ObjectId()
    const {artId, comment, decoded} = req.body
    if (!artId || !comment) {
        res.sendStatus(400)
        return
    }
    await prisma.$connect()
    prisma.comment.create({
        data:{
            id:`${id}`,
            artId:artId,
            artistId:decoded.data.id,
            commet:comment
        },select:{
            id:true,
            commet:true,
            date:true,
            Artist:{
                select:{
                    id:true,
                    profilePic:true,
                    name:true
                }
            }
        }
    }).then(data => res.send(data)).catch(err => res.status(400).send(err))
}