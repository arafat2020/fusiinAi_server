"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testNotice_1 = require("../controller/test/testNotice");
const test_copy_1 = require("../controller/test/test copy");
const testRouter = (0, express_1.Router)();
testRouter.route('/test').post(testNotice_1.setNotice);
testRouter.route('/cmp').post(test_copy_1.testCmp);
exports.default = testRouter;
