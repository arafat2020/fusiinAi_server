import { Request, Response } from "express";
import { verifyJwt } from "../lib/jwt";

export const veryfyAuth = async (req: Request, res: Response) => {
    const token: string | undefined = req.headers.authorization?.split(' ')[1]

    if (!token) {
        res.status(401).send({
            err: 'No tokne provided'
        })
        return
    }
    const decoded = await verifyJwt(`${token}`)
    
    if (decoded === null) {

        res.status(401).send({
            err: 'User is unAthenticated or token expired'
        })
        return
    }
    res.send(decoded)
}