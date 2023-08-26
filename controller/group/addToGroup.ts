import { Request, Response } from "express";
import { AddtoGroupCredentila } from "../../interface";
import { CompressImgRef, PrismaClient } from "@prisma/client";
import { CompressImagUrl } from "../../lib/sharp";

const prisma = new PrismaClient()

export async function addToGroup(req: Request, res: Response) {
    const dto = req.body as AddtoGroupCredentila
    let cmpUrl: string
    await prisma.$connect()
    try {
        const data = prisma.$transaction(async prisma => {
            const isCompressImgRefExist = await prisma.compressImgRef.findMany({
                where: {
                    artId: dto.artID
                }
            })
            if (isCompressImgRefExist.length > 0) {
                cmpUrl = isCompressImgRefExist[0].compress_url
            } else {
                const cmp = await CompressImagUrl(dto.imgUrl)
                if (cmp.isSucsess === false) {
                    res.sendStatus(500)
                    return
                }
                cmpUrl = cmp.url
            }
            await prisma.compressImgRef.create({
                data: {
                    artGroupId: dto.artGroupID,
                    compress_url: cmpUrl,
                    artId: dto.artID
                }
            })

            const group = await prisma.artGroup.findUnique({
                where: {
                    id: dto.artGroupID
                },
                select: {
                    id: true,
                    name: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            profilePic: true
                        }
                    },
                    imageGroup: {
                        select: {
                            id: true,
                            compress_url: true,
                            ref: {
                                select: {
                                    id: true,
                                    Artist: {
                                        select: {
                                            id: true,
                                            name: true,
                                            profilePic: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            return group
        })
        res.send(data)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}