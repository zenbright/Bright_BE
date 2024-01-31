import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import morgan from "morgan";
import basicAuth from "express-basic-auth";
import logger from './logger';
import mongoose from 'mongoose';
import redisClient from "./service/utils/redisConfig";
import ResponseHandler from "./service/utils/responseHandler";
import swaggerJSDoc from "./swagger";
import swaggerUI from "swagger-ui-express";
import { ROUTE_ENDPOINT } from "./config";
import endpoint from "./endpoints";
import errorResponseHandler from "./service/utils/errorResponseHandler";

dotenv.config();

import {
  MORGAN_FORMAT,
  CORS_OPTIONS,
  USERNAME_API_DOCS,
  PASSWORD_API_DOCS,
  NODE_ENV,
  PORT_SERVER,
  MONGO_URI,
  DB_NAME
} from "./config";

const app = express();

// Logging
if (["development", "local", "production"].includes(NODE_ENV)) {
  const morganStream = (statusCode: any) => (req: any, res: any) =>
    !req.originalUrl.includes("api-docs") && res.statusCode >= statusCode;
  app.use(
    morgan(MORGAN_FORMAT, { skip: morganStream(400), stream: process.stderr }),
  );
  app.use(
    morgan(MORGAN_FORMAT, { skip: morganStream(200), stream: process.stdout }),
  );
} else {
  app.use(
    morgan(MORGAN_FORMAT, {
      skip: (req, res) => res.statusCode < 400,
      stream: process.stderr,
    }),
  );
  app.use(
    morgan(MORGAN_FORMAT, {
      skip: (req, res) => res.statusCode >= 400,
      stream: process.stdout,
    }),
  );
}

// Connect Redis
redisClient.connect();

// Handle Response
app.use((req, res: any, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.RH = new ResponseHandler(res);
  next();
});

// Enable CORS
app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Origin,X-Requested-With,Content-Type,Accept,Authorization,Accept-Language",
}));

// Reverse Proxy
app.enable('trust proxy');

// Swagger APIs Docs
if (["production", "development", "local"].includes(NODE_ENV)) {
  app.use(
    "/bright-backend/api-docs",
    basicAuth({
      users: { [USERNAME_API_DOCS]: PASSWORD_API_DOCS },
      challenge: true,
    }),
    swaggerUI.serve,
    swaggerUI.setup(swaggerJSDoc),
  );
}

// API settings
app.use(compression());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));

// Server test
app.get(`${ROUTE_ENDPOINT.BASE_URL_V1}${ROUTE_ENDPOINT.PING}`, (req, res) => {
  res.json({
    success: true,
    message: "pong",
  });
});

// Sever route
app.use(ROUTE_ENDPOINT.BASE_URL_V1, endpoint);

// Handle Response
app.use((req, res: any, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.RH = new ResponseHandler(res);
  next();
});

// Connect MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI).then(async (data) => {
  logger.info(`Mongodb connected ${MONGO_URI} : ${DB_NAME}`);
})
  .catch((error) => {
    console.log(error);
    logger.error('Please make sure Mongodb is installed and running!');
    process.exit(1);
  });

// Server Listener
app.listen(PORT_SERVER, () => {
  logger.info(`Server is running on port ${PORT_SERVER}`);
  console.log(`Server is running on port ${PORT_SERVER}`);
});

// Errors Handler
app.use(errorResponseHandler);

export default app;