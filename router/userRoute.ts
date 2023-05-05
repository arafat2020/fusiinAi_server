import { Router } from "express";
import { register } from "../controller/user/user";
import { getUser } from "../controller/user/getUser";
import { isAuth } from "../middleware/isauth";
import { login } from "../controller/user/login";
import { veryfyAuth } from "../middleware/veryfyAuth";

const userRoute = Router()

userRoute.route('/register').post(register)
userRoute.route('/me').get(isAuth,getUser)
userRoute.route('/veryfy').post(veryfyAuth)
userRoute.route('/login').post(login)

export default userRoute