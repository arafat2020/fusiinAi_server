import { Router } from "express";
import { testUpload } from "../controller/test/test";
import { setNotice } from "../controller/test/testNotice";
import { compressImgeUrl } from "../controller/test/compIpmg";
import { testCmp } from "../controller/test/test copy";

const testRouter = Router()

testRouter.route('/test').post(setNotice)
testRouter.route('/cmp').post(testCmp)

export default testRouter