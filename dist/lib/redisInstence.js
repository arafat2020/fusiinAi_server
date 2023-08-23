"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flushCode = exports.getCode = exports.CodeGenaretor = void 0;
const redis_om_1 = require("redis-om");
const redis_1 = require("redis");
const redis = (0, redis_1.createClient)({
    url: process.env.REDIS2
});
redis.on('error', (err) => console.log('Redis Client Error', err));
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (redis.isOpen)
            return;
        yield redis.connect();
    });
}
const CodeSChema = new redis_om_1.Schema('code', {
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
});
const codeReository = new redis_om_1.Repository(CodeSChema, redis);
class CodeGenaretor {
    constructor(email, userID) {
        this.email = email;
        this.userID = userID;
    }
    generateCode() {
        let code;
        const arr = [];
        for (let index = 0; index < 5; index++) {
            let num = Math.floor(Math.random() * 6);
            arr[index] = num;
        }
        code = arr.join('');
        return code;
    }
    newCode() {
        return __awaiter(this, void 0, void 0, function* () {
            yield connect();
            try {
                const obj = {
                    email: this.email,
                    userID: this.userID,
                    codex: parseInt(this.generateCode())
                };
                const ttlInSeconds = 60 * 60;
                const code = yield codeReository.save(obj);
                yield codeReository.expire(`${code[redis_om_1.EntityId]}`, ttlInSeconds);
                return {
                    isCode: true,
                    code: code,
                    entityID: code[redis_om_1.EntityId]
                };
            }
            catch (error) {
                console.log(error);
                return {
                    isCode: false,
                    code: 'NO_CODE',
                    entityID: undefined
                };
            }
        });
    }
    getCode() {
        return __awaiter(this, void 0, void 0, function* () {
            yield connect();
        });
    }
    dumpCode() {
        return __awaiter(this, void 0, void 0, function* () {
            yield connect();
        });
    }
}
exports.CodeGenaretor = CodeGenaretor;
function getCode(entityID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield connect();
        const data = codeReository.fetch(entityID);
        return data;
    });
}
exports.getCode = getCode;
function flushCode() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connect();
        yield codeReository.createIndex();
        const allCode = yield codeReository.search().return.all();
        return allCode;
    });
}
exports.flushCode = flushCode;
