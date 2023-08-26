import { Router } from "express";
import { isAuth } from "../middleware/isauth";
import { createGorupo } from "../controller/group/createGroup";

const artGroupRouter = Router()

artGroupRouter.route('/createGroup').post(isAuth,createGorupo)

export default artGroupRouter