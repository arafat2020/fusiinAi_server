import { Router } from "express";
import { testUpload } from "../controller/test/test";

const testRouter = Router()

testRouter.route('/test').post(testUpload)

export default testRouter