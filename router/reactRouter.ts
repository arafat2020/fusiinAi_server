import { Router } from "express";
import { reactOp } from "../controller/react/react";
import { isAuth } from "../middleware/isauth";

const reactRouter = Router()

reactRouter.route('/react').post(isAuth,reactOp)

export default reactRouter