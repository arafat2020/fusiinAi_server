import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Mailer } from '../../lib/mailer';
import { setCode } from '../../lib/redis';
import { CodeGenaretor } from '../../lib/redisInstence';

dotenv.config()

export const sendCode = async (req: Request, res: Response) => {
    const { email, userID } = req.body
    console.log(email,userID);
    
    if (email && userID) {
        const code = new CodeGenaretor(email , userID )
        console.log(code.generateCode());
        const instaneofCode = await code.newCode()
    
    
        const mailer = new Mailer(email,
            'Confermation Code', `Confermation code  is ${instaneofCode.code.codex}`
            , res
            , instaneofCode.entityID ? instaneofCode.entityID : 'none'
        )
    
        instaneofCode.isCode ? mailer.snedMail() : res.sendStatus(500)
    } else {
        res.sendStatus(400)
    }
   
}