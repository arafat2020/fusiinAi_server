import { Request, Response } from "express";
import { creatNotificarion } from "../../lib/redis";

export async function setNotice(req: Request, res: Response) {
    const data = await creatNotificarion({
        id: 'afafgf',
        seen: false,
        userId: 'dsgaedaedf',
        url: 'fasdfgasgS',
        time: Date.now().toString(),
        notification: {
            actuserId: 'dgsdfgsdfg',
            actUserName: 'arafat',
            actUserPic: 'dfSFSFSF',
            actType: 'comment',
            msg: 'zdfgdgZDgdg'
        }
    })
    res.send(data)
}