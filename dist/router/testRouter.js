"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_1 = require("../controller/test/test");
const testRouter = (0, express_1.Router)();
testRouter.route('/test').post(test_1.testUpload);
exports.default = testRouter;
