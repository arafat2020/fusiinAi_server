"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sendConfermationcode_1 = require("../controller/email/sendConfermationcode");
const mailRouter = (0, express_1.Router)();
mailRouter.route('/code').post(sendConfermationcode_1.sendCode);
exports.default = mailRouter;
