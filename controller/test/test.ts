import { Request, Response } from "express";
import { uploader } from "../../lib/uploadManeger";
export const testUpload = async (req: Request, res: Response) => {
    const { data } = req.body
    const main = await uploader(data)
    res.send({
        data:main
    })

}