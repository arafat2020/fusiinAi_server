import { Router } from "express";
import { postCmt } from "../controller/comment/postCmt";
import { deleteCmt } from "../controller/comment/deleteCmt";
import { updateCmt } from "../controller/comment/updateCmt";
import { isAuth } from "../middleware/isauth";

const cmtRouter = Router()

cmtRouter.route('/postCmt').post(isAuth,postCmt)
cmtRouter.route('/deleteCmt').post(isAuth,deleteCmt)
cmtRouter.route('/updateCmt').post(isAuth,updateCmt)

export default cmtRouter