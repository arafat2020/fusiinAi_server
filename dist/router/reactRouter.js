"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const react_1 = require("../controller/react/react");
const isauth_1 = require("../middleware/isauth");
const reactv2_1 = require("../controller/react/reactv2");
const postReact_1 = require("../controller/react/postReact");
const reactRouter = (0, express_1.Router)();
reactRouter.route('/react').post(isauth_1.isAuth, reactv2_1.reactOpV2);
reactRouter.route('/postReact').post(isauth_1.isAuth, postReact_1.postReact);
reactRouter.route('/react_auternetive').post(isauth_1.isAuth, react_1.reactOp);
exports.default = reactRouter;
