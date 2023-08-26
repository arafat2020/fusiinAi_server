import { Router } from "express";
import { testUpload } from "../controller/test/test";
import { setNotice } from "../controller/test/testNotice";
import { compressImgeUrl } from "../controller/test/compIpmg";

const testRouter = Router()

testRouter.route('/test').post(setNotice)
testRouter.route('/cmp').post(compressImgeUrl)

export default testRouter