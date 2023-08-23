import { Request, Response } from "express"
import { getCode as getcodex } from "../../lib/redisInstence"

export const getCode = async (req: Request, res: Response) => {
    const { code } = req.body
    try {
        const data = await getcodex(code)
        res.send(data)
    } catch (error) {
        console.log(error);
        
        res.sendStatus(500)
    }
}