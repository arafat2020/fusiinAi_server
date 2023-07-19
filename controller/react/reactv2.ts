import { PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const reactOpV2 = async (req: Request, res: Response) => {
    const id = new ObjectId()

    const { decoded, artId, type } = req.body
    if (!artId || !type) {
        res.sendStatus(400)
        return
    }
    console.time('b')
    await prisma.$connect()
    prisma.$transaction(async (tx) => {
        const isReacted = await tx.react.findMany({
            where: {
                artistId: decoded.data.id,
                artId: artId,
            },
        });

        if (isReacted.length === 0) {
            await tx.react.create({
                data: {
                    id: `${id}`,
                    artId: artId,
                    artistId: decoded.data.id,
                    type: type ? type : 'like',
                },
            });
        } else {
            if (isReacted[0].type === type) {
                await tx.react.delete({
                    where: {
                        id: isReacted[0].id,
                    },
                });
            } else {
                await tx.react.update({
                    where: {
                        id: isReacted[0].id,
                    },
                    data: {
                        type: type,
                    },
                });
            }
        }

        const art = await tx.art.findUnique({
            where: {
                id: artId,
            },
            select: {
                id: true,
                img: true,
                height: true,
                width: true,
                Artist: {
                    select: {
                        id: true,
                        profilePic: true,
                    },
                },
                react: {
                    select: {
                        id: true,
                        type: true,
                        artistId: true,
                    },
                },
            },
        });

        return art;
    },
        {
            maxWait: 10000,
            timeout: 15000
        }).then(data => {
            console.timeEnd('b')


            res.send(data)
        }).catch(err => {


            res.status(500).send(err)
        })

}