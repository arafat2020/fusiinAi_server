import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path  from "path"
import bodyParser from 'body-parser';
import testRouter from './router/testRouter';
import userRoute from './router/userRoute';
import cors from 'cors'
import postRouter from './router/postRouter';
import reactRouter from './router/reactRouter';



dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// -------------------add middlewarwe----------------------------

app.use(express.json({limit:'50mb'}))
app.use(cors())
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// -------------------add middlewarwe end----------------------------
// add router
app.use(testRouter)
app.use(userRoute)
app.use(postRouter)
app.use(reactRouter)
// add router end
// --------------------------deployment------------------------------

const dev = true

const __dirname1 = path.resolve();

if (!dev) {
  app.use(express.static(path.join(__dirname1, "/client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"))
  );
} else {
  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });
}
// --------------------------deployment end------------------------------


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});