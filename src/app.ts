import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import morgan from "morgan";
import basicAuth from "express-basic-auth";
import logger from "./logger";
import redisClient from "./service/utils/redisConfig";
import ResponseHandler from "./service/utils/responseHandler";
import swaggerJSDoc from "./swagger";
import swaggerUI from "swagger-ui-express";
import { ROUTE_ENDPOINT } from "./config";
import endpoint from "./endpoints";
import path from "path";
import errorResponseHandler from "./service/utils/errorResponseHandler";
import connectToMongoDB from "./mongodb";
import initSocketIo from "./socketIo";
import staticRoutes from "./static.route";
import {
  MORGAN_FORMAT,
  CORS_OPTIONS,
  USERNAME_API_DOCS,
  PASSWORD_API_DOCS,
  NODE_ENV,
  PORT_SERVER,
} from "./config";

const __dirname = path.resolve();

dotenv.config();

const app = express();

// Set up logging middleware
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

// Connect to Redis
redisClient.connect();

// Enable CORS
app.use(cors(CORS_OPTIONS));

// Get access to user IP address
app.enable("trust proxy");

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

app.use(compression());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));

app.get(`${ROUTE_ENDPOINT.BASE_URL_V1}${ROUTE_ENDPOINT.PING}`, (req, res) => {
  res.json({
    success: true,
    message: "pong",
  });
});

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

// Use the static routes module
app.use("/", staticRoutes);

// Connect to MongoDB
connectToMongoDB();

const server = app.listen(PORT_SERVER, () => {
  // ? Logging restart service
  logger.info(`Server is running on port ${PORT_SERVER}`);
  console.log(`Server is running on port ${PORT_SERVER}`);
});

// Connect to socket.io
initSocketIo(server, redisClient);

// Handle Errors
app.use(errorResponseHandler);

export default app;
