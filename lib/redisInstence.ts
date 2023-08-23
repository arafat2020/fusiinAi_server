import { Entity, Schema, Repository, EntityId } from 'redis-om'
import { createClient } from 'redis';

const redis = createClient({
    url: process.env.REDIS2
})
redis.on('error', (err) => console.log('Redis Client Error', err));
async function connect() {

   if (redis.isOpen) return
   await redis.connect()
}

const CodeSChema = new Schema('code', {
    email: {
        type: 'string'
    },
    userID: {
        type: 'string'
    },
    codex: {
        type: 'number'
    }
}, {
    dataStructure: 'HASH'
})

const codeReository = new Repository(CodeSChema, redis)

export class CodeGenaretor {
    constructor(
        private email: string,
        private userID: string,
    ) { }

    generateCode() {
        let code: string
        const arr = []
        for (let index = 0; index < 5; index++) {
            let num = Math.floor(Math.random() * 6)
            arr[index] = num
        }
        code = arr.join('')
        return code
    }

    async newCode(): Promise<{
        isCode: Boolean,
        code: any,
        entityID: string | undefined
    }> {
        await connect()
        try {
            const obj = {
                email: this.email,
                userID: this.userID,
                codex: parseInt(this.generateCode())
            }
            const ttlInSeconds = 60 * 60
          
            const code = await codeReository.save(obj)
            await codeReository.expire(`${code[EntityId]}`,ttlInSeconds)
            return {
                isCode: true,
                code: code,
                entityID: code[EntityId]
            }
        } catch (error) {
            console.log(error);

            return {
                isCode: false,
                code: 'NO_CODE',
                entityID: undefined
            }
        }

    }
    async getCode() {
        await connect()
    }
    async dumpCode() {
        await connect()
    }

}

export async function getCode(entityID: string): Promise<Entity> {
    await connect()
    const data = codeReository.fetch(entityID)
    return data
}

export async function flushCode() {
    await connect()
    await codeReository.createIndex()
   const allCode = await codeReository.search().return.all()
   return allCode
}