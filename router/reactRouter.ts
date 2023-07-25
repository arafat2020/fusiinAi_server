import { Router } from "express";
import { reactOp } from "../controller/react/react";
import { isAuth } from "../middleware/isauth";
import { reactOpV2 } from "../controller/react/reactv2";
import { postReact } from "../controller/react/postReact";

const reactRouter = Router()

reactRouter.route('/react').post(isAuth,reactOpV2)
reactRouter.route('/postReact').post(isAuth,postReact)
reactRouter.route('/react_auternetive').post(isAuth,reactOp)

export default reactRouter