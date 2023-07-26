import { PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export async function postReact(req: Request, res: Response) {
    const { decoded, artId, type } = req.body
    const id = new ObjectId()
    if (!artId || !type) {
        res.sendStatus(400)
        return
    }
    await prisma.$connect()
    await prisma.$transaction(async (tx) => {
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
    }, {
        maxWait: 10000,
        timeout: 15000
    })
    prisma.$transaction([
        prisma.react.count({
            where: {
                artId: `${artId}`,
                type: 'like'
            }
        }),
        prisma.react.count({
            where: {
                artId: `${artId}`,
                type: 'love'
            }
        }),
        prisma.react.count({
            where: {
                artId: `${artId}`,
                type: 'dislike'
            }
        })
    ]).then(count=>res.send(count)).catch(err=>res.status(500).send(err))
}