"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const testRouter_1 = __importDefault(require("./router/testRouter"));
const userRoute_1 = __importDefault(require("./router/userRoute"));
const cors_1 = __importDefault(require("cors"));
const postRouter_1 = __importDefault(require("./router/postRouter"));
const reactRouter_1 = __importDefault(require("./router/reactRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// -------------------add middlewarwe----------------------------
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// -------------------add middlewarwe end----------------------------
// add router
app.use(testRouter_1.default);
app.use(userRoute_1.default);
app.use(postRouter_1.default);
app.use(reactRouter_1.default);
// add router end
// --------------------------deployment------------------------------
const dev = true;
const __dirname1 = path_1.default.resolve();
if (!dev) {
    app.use(express_1.default.static(path_1.default.join(__dirname1, "/client/dist")));
    app.get("*", (req, res) => res.sendFile(path_1.default.resolve(__dirname1, "client", "dist", "index.html")));
}
else {
    app.get('/', (req, res) => {
        res.send('Express + TypeScript Server');
    });
}
// --------------------------deployment end------------------------------
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
