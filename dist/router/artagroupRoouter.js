"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isauth_1 = require("../middleware/isauth");
const createGroup_1 = require("../controller/group/createGroup");
const artGroupRouter = (0, express_1.Router)();
artGroupRouter.route('/createGroup').post(isauth_1.isAuth, createGroup_1.createGorupo);
exports.default = artGroupRouter;
