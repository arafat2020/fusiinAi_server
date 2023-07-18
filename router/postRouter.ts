import { Router } from "express";
import { isAuth } from "../middleware/isauth";
import { createPost } from "../controller/post/createPost";
import { updatePost } from "../controller/post/updatePost";
import { deletPoat } from "../controller/post/deletePost";
import { myPost } from "../controller/post/myPost";
import { getPost } from "../controller/post/getPost";
import { searchPost } from "../controller/post/searchPost";

const postRouter = Router()

postRouter.route('/create').post(isAuth,createPost)
postRouter.route('/update').post(isAuth,updatePost)
postRouter.route('/delete').post(isAuth,deletPoat)
postRouter.route('/myart').post(isAuth,myPost)
postRouter.route("/getPost").get(getPost)
postRouter.route("/search").get(searchPost)

export default postRouter