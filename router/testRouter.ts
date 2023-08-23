import { Router } from "express";
import { testUpload } from "../controller/test/test";
import { setNotice } from "../controller/test/testNotice";

const testRouter = Router()

testRouter.route('/test').post(setNotice)

export default testRouter