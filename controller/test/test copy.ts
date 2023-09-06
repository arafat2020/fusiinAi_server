import { Art, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CompressImagUrl } from "../../lib/sharp";

const prisma = new PrismaClient()

export const testCmp = async (req: Request, res: Response) => {
    const NullArt:Art[] = []
    const arts = await prisma.art.findMany({
    })
    await arts.map(art=>{
        if (art.cmp === null) NullArt.push(art)
    })
    // res.send(NullArt)
    for (let index = 0; index < NullArt.length; index++) {
        if (NullArt[index].cmp === null) {
            const cpm = await CompressImagUrl(NullArt[index].img)
            const updt = await prisma.art.update({
                where: {
                    id: NullArt[index].id
                }, data: {
                    cmp: cpm.isSucsess ? cpm.url : null
                }
            })
            console.log(updt,index,NullArt.length);
        }

    }
    // arts.map(async (art, i) => {
    //     if (art.cmp === null) {
    //         
    //         const updtArt = prisma.art.update({
    //             where: {
    //                 id: art.id
    //             }, data: {
    //                 cmp: cpm.isSucsess ? cpm.url : null
    //             }
    //         })
    //         console.log(i, updtArt);

    //     }
    // })
}