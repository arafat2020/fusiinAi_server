import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ObjectId } from 'bson'
import validator from 'validator'
import { uploader } from "../../lib/uploadManeger";
import { hashed } from "../../lib/hasg";
import { createToken } from "../../lib/jwt";
import cld from "../../lib/cldUploader";

const prisma = new PrismaClient()

export const register = async (req: Request, res: Response) => {
    const id = new ObjectId()

    const { baio, email, name, password, img } = req.body
    if (!baio || !email || !name || !password) {
        res.status(400).send({
            err: "All required field must be filled up"
        })
        return
    }
    if (!validator.isEmail(email)) {
        res.status(400).send({
            err: 'Enter a valid E-mail'
        })
        return
    }
    await prisma.$connect()
    const imgObj = await uploader(img)
    prisma.artist.create({
        data: {
            id: `${id}`,
            about: baio,
            email: email,
            name: name,
            password: `${await hashed(password)}`,
            profilePic: img ? `${imgObj?.url}` : null
        }
    }).then(async data => {
        res.send({
            user: data,
            token: await createToken(data.id, data.name)
        })
    }).catch(async er => {
        await cld.uploader.destroy(imgObj ? imgObj.url : '')
        res.status(400).send(er)
    }).finally(() => {
        prisma.$disconnect()
    })
}