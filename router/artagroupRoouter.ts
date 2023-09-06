import { Router } from "express";
import { isAuth } from "../middleware/isauth";
import { createGorupo } from "../controller/group/createGroup";
import { addToGroup } from "../controller/group/addToGroup";
import { getGroup } from "../controller/group/getGroup";
import { getGroupName } from "../controller/group/getGroupname";
import { removeFromFroup } from "../controller/group/removeFromGroup";
import { deleteGRoup } from "../controller/group/deleteGroup";
import { getMyGroup } from "../controller/group/getMyGroup";
import { getGroupForFedd } from "../controller/group/getGroupForFeed";

const artGroupRouter = Router()

artGroupRouter.route('/createGroup').post(isAuth,createGorupo)
artGroupRouter.route('/addToGroup').post(isAuth,addToGroup)
artGroupRouter.route('/getGroup').post(isAuth,getGroup)
artGroupRouter.route('/getGroupName').post(isAuth,getGroupName)
artGroupRouter.route('/removeFromFroup').post(isAuth,removeFromFroup)
artGroupRouter.route('/deleteGroup').post(isAuth,deleteGRoup)
artGroupRouter.route('/getMyGroup').post(isAuth,getMyGroup)
artGroupRouter.route('/getFeedGroup').get(getGroupForFedd)

export default artGroupRouter