"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const testRouter_1 = __importDefault(require("./router/testRouter"));
const userRoute_1 = __importDefault(require("./router/userRoute"));
const cors_1 = __importDefault(require("cors"));
const postRouter_1 = __importDefault(require("./router/postRouter"));
const reactRouter_1 = __importDefault(require("./router/reactRouter"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fusion Ai Dev server',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'https://aipic.onrender.com'
            },
            {
                url: 'http://localhost:5000'
            },
        ]
    },
    apis: ['./docs/docs*.ts'], // files containing annotations as above
};
const openapiSpecification = (0, swagger_jsdoc_1.default)(options);
const app = (0, express_1.default)();
const port = process.env.PORT;
// -------------------add middlewarwe----------------------------
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cors_1.default)());
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapiSpecification));
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
app.get('/', (req, res) => {
    res.send('hello from express');
});
// --------------------------deployment end------------------------------
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
