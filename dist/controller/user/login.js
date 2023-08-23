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
exports.login = void 0;
const client_1 = require("@prisma/client");
const hasg_1 = require("../../lib/hasg");
const jwt_1 = require("../../lib/jwt");
const prisma = new client_1.PrismaClient();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        res.sendStatus(400);
        return;
    }
    yield prisma.$connect();
    prisma.artist.findUnique({
        where: {
            email: email
        },
    }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (!user) {
            res.status(404).send({
                err: true,
                msg: 'User not found'
            });
            return;
        }
        const isAuth = yield (0, hasg_1.verifyHash)(password, `${user === null || user === void 0 ? void 0 : user.password}`);
        if (!isAuth) {
            res.status(401).send({
                err: true,
                msg: 'Incorrect PassWord'
            });
            return;
        }
        const token = yield (0, jwt_1.createToken)(`${user === null || user === void 0 ? void 0 : user.id}`, `${user === null || user === void 0 ? void 0 : user.name}`);
        res.send({
            user: {
                id: user === null || user === void 0 ? void 0 : user.id,
                name: user === null || user === void 0 ? void 0 : user.name,
                baio: user === null || user === void 0 ? void 0 : user.about,
                jonedAt: user === null || user === void 0 ? void 0 : user.joinedAt,
                profilePic: user === null || user === void 0 ? void 0 : user.profilePic
            },
            token: token
        });
    })).catch(err => {
        console.log(err);
        res.sendStatus(501).send(err);
    });
});
exports.login = login;
