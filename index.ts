import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import testRouter from './router/testRouter';
import userRoute from './router/userRoute';
import cors from 'cors'
import postRouter from './router/postRouter';
import reactRouter from './router/reactRouter';
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import cmtRouter from './router/cmtRouter';
import favouriteRoute from './router/fvRoute';


dotenv.config();
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


const openapiSpecification = swaggerJsdoc(options);

const app: Express = express();
const port = process.env.PORT;

// -------------------add middlewarwe----------------------------

app.use(express.json({ limit: '50mb' }))
app.use(cors())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// -------------------add middlewarwe end----------------------------
// add router
app.use(testRouter)
app.use(userRoute)
app.use(postRouter)
app.use(reactRouter)
app.use(cmtRouter)
app.use(favouriteRoute)
// add router end
// --------------------------deployment------------------------------
app.get('/',(req:Request ,res:Response)=>{
res.send('hello from express')
})

// --------------------------deployment end------------------------------


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});