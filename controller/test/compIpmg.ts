import { Request, Response } from "express";
import { CompressImagUrl as Cmpurl } from "../../lib/sharp";

export async function compressImgeUrl(req: Request, res: Response) {
    const { url } = req.body
    if (url) {
        
       const data = await Cmpurl(url)
        res.send(data)
    } else {
        res.status(400).send('bad requist')
    }
}