var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import morgan from "morgan";
import basicAuth from "express-basic-auth";
import logger from "./logger";
import mongoose from "mongoose";
import redisClient from "./service/utils/redisConfig";
import ResponseHandler from "./service/utils/responseHandler";
import swaggerJSDoc from "./swagger";
import swaggerUI from "swagger-ui-express";
import { ROUTE_ENDPOINT } from "./config";
import endpoint from "./endpoints";
import path from "path";
import errorResponseHandler from "./service/utils/errorResponseHandler";
import router from "./endpoints";
import passport from "passport";
import("./service/authentication/google/googleAuth.service");
const __dirname = path.resolve();
dotenv.config();
import { MORGAN_FORMAT, CORS_OPTIONS, USERNAME_API_DOCS, PASSWORD_API_DOCS, NODE_ENV, PORT_SERVER, MONGO_URI, DB_NAME, } from "./config";
const app = express();
// Set up logging middleware
if (["development", "local", "production"].includes(NODE_ENV)) {
    const morganStream = (statusCode) => (req, res) => !req.originalUrl.includes("api-docs") && res.statusCode >= statusCode;
    app.use(morgan(MORGAN_FORMAT, { skip: morganStream(400), stream: process.stderr }));
    app.use(morgan(MORGAN_FORMAT, { skip: morganStream(200), stream: process.stdout }));
}
else {
    app.use(morgan(MORGAN_FORMAT, {
        skip: (req, res) => res.statusCode < 400,
        stream: process.stderr,
    }));
    app.use(morgan(MORGAN_FORMAT, {
        skip: (req, res) => res.statusCode >= 400,
        stream: process.stdout,
    }));
}
// Connect to Redis
redisClient.connect();
// Enable CORS
app.use(cors(CORS_OPTIONS));
// Get access to user IP address
app.enable("trust proxy");
// Swagger APIs Docs
if (["production", "development", "local"].includes(NODE_ENV)) {
    app.use("/bright-backend/api-docs", basicAuth({
        users: { [USERNAME_API_DOCS]: PASSWORD_API_DOCS },
        challenge: true,
    }), swaggerUI.serve, swaggerUI.setup(swaggerJSDoc));
}
app.use(compression());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
// passport initialize
app.use(session({
    secret: "Bright",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
app.use(passport.initialize());
app.use(passport.session());
app.get(`${ROUTE_ENDPOINT.BASE_URL_V1}${ROUTE_ENDPOINT.PING}`, (req, res) => {
    res.json({
        success: true,
        message: "pong",
    });
});
//app.use(endpoint)
app.use(ROUTE_ENDPOINT.BASE_URL_V1, endpoint);
// Handle Response
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.RH = new ResponseHandler(res);
    next();
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/service/authentication/github/index.html"));
});
// MongoDB Connection
mongoose.set("strictQuery", false);
mongoose
    .connect(MONGO_URI)
    .then((data) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info(`Mongodb connected ${MONGO_URI} : ${DB_NAME}`);
}))
    .catch((error) => {
    console.log(error);
    logger.error("Please make sure Mongodb is installed and running!");
    process.exit(1);
});
app.listen(PORT_SERVER, () => {
    // ? Logging restart service
    logger.info(`Server is running on port ${PORT_SERVER}`);
    console.log(`Server is running on port ${PORT_SERVER}`);
});
app.use(router);
// Handle Errors
app.use(errorResponseHandler);
export default app;
