"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const react_1 = require("../controller/react/react");
const isauth_1 = require("../middleware/isauth");
const reactRouter = (0, express_1.Router)();
reactRouter.route('/react').post(isauth_1.isAuth, react_1.reactOp);
exports.default = reactRouter;
