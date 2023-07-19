import { PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const reactOp = async (req: Request, res: Response) => {
    const id = new ObjectId()

    const { decoded, artId, type } = req.body
    if (!artId || !type) {
        res.sendStatus(400)
        return
    }
    console.time('c')

    const isReacted = await prisma.react.findMany({
        where: {
            artistId: decoded.data.id,
            artId:artId
        }
    })

    if (isReacted.length === 0) {
        await prisma.react.create({
            data: {
                id: `${id}`,
                artId: artId,
                artistId: decoded.data.id,
                type: type ? type : 'like'
            }
        })
        await prisma.art.findUnique({
            where: {
                id:artId
            },select:{
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
            }
        }).then(data => {
            console.timeEnd('c')

            res.send(data)}).catch(err => res.status(400).send(err)).finally(() => prisma.$disconnect())
        return
    }
    if (isReacted.length !== 0) {
        if (isReacted[0].type === type) {
            await prisma.react.delete({
                where: {
                    id: isReacted[0].id
                }
            })
            await prisma.art.findUnique({
                where: {
                    id:artId
                },select:{
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
                }
            }).then(data => {
                console.timeEnd('c')

                res.send(data)}).catch(err => res.status(400).send(err)).finally(() => prisma.$disconnect())
            return
        } else {
            await prisma.react.update({
                where: {
                    id: isReacted[0].id,
                }, data: {
                    type: type
                }
            })
            await prisma.art.findUnique({
                where: {
                    id:artId
                },select:{
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
                }
            }).then(data => {    console.timeEnd('c')

                res.send(data)}).catch(err => res.status(400).send(err)).finally(() => prisma.$disconnect())
            return
        }
    }
    console.timeEnd('c')


}