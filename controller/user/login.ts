import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { verifyHash } from "../../lib/hasg";
import { createToken } from '../../lib/jwt'


const prisma = new PrismaClient()


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    console.log(email,password);
    
    if (!email || !password) {
        res.sendStatus(400)
        return
    }
    await prisma.$connect()
    prisma.artist.findUnique({
        where: {
            email: email
        },

    }).then(async user => {
        const isAuth = await verifyHash(password, `${user?.password}`)
        if (!isAuth) {
            res.status(401).send('Incorrect Password')
            return
        }
        const token = await createToken(`${user?.id}`, `${user?.name}`)
        res.send({
            user: {
                id: user?.id,
                name: user?.name,
                baio: user?.about,
                jonedAt: user?.joinedAt,
                profilePic: user?.profilePic
            },
            token: token
        })
    }).catch(err => {
        console.log(err);
        
        res.sendStatus(501).send(err)
    })
}