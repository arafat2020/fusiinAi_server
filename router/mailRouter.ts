import { Router } from "express";
import { sendCode } from "../controller/email/sendConfermationcode";

 const mailRouter = Router()

 mailRouter.route('/code').post(sendCode)

 export default mailRouter