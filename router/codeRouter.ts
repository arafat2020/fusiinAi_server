import { Router } from "express";
import { getCode } from "../controller/confermation/getCode";
import { flushCode } from "../controller/confermation/flushCode";

const codeRouter = Router()

codeRouter.route("/getCode").post(getCode)
codeRouter.route("/flushCode").post(flushCode)

export default codeRouter