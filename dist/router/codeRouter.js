"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getCode_1 = require("../controller/confermation/getCode");
const flushCode_1 = require("../controller/confermation/flushCode");
const codeRouter = (0, express_1.Router)();
codeRouter.route("/getCode").post(getCode_1.getCode);
codeRouter.route("/flushCode").post(flushCode_1.flushCode);
exports.default = codeRouter;
