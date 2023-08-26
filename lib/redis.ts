import { createClient } from 'redis';
import dotenv from 'dotenv'
import { EntityId } from 'redis-om';
import { NotiFicationSChema } from '../interface/interface';


dotenv.config()


const redis = createClient({
    url: process.env.REDIS
})
redis.on('error', err => console.log('Redis Client Error', err));

async function connect() {

    if (redis.isOpen) return
    await redis.connect()
 }

export async function creatNotificarion(params:NotiFicationSChema,) {
    const obj = params
    await connect()
    await redis.hSet(obj.id,obj.userId,JSON.stringify(obj))
    await redis.expire(obj.userId,3600*2)
    const notice = await redis.hGetAll(obj.id)
    return notice
}


export async function setCode(code: Number, key: string) {
    await connect()
    await redis.set(key, `${code}`)
    await redis.expire(key,3600)
    const value = await redis.get(key)
    return value
}
