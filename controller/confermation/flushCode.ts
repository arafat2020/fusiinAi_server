import { Request, Response } from "express";
import { flushCode as flsCode } from "../../lib/redisInstence";

export const flushCode = async (req:Request,res:Response)=>{
    try {
        const allCode = await flsCode()
        res.send(allCode)
    } catch (error) {
        console.log(error);
        
        res.status(500).send({
            msg:"Flusing failed"
        }) 
    }
}