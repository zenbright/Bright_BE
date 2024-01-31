// Desc: Load environment variables from .env file
import dotenv from "dotenv";

// Load Env file
dotenv.config();

// Port
export const PORT_SERVER = process.env.PORT_SERVER || 4000;

// Environment
export const NODE_ENV: string = process.env.NODE_ENV || "local";

// Apply all request
export const SERVER_ORIGIN: string = process.env.SERVER_ORIGIN || "*";

// CORS
export const CORS_OPTIONS: object = {
  origin: SERVER_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Origin,X-Requested-With,Content-Type,Accept,Authorization,Accept-Language",
};

// Logger
export const MORGAN_FORMAT: string =
  ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';

// Swagger
export const USERNAME_API_DOCS: string = process.env.USERNAME_API_DOCS || "admin";
export const PASSWORD_API_DOCS: string = process.env.PASSWORD_API_DOCS || "admin";
export const API_DOCS_HOST: string = process.env.API_DOCS_HOST || "localhost:4000";
export const BRIGHT_URL: string = process.env.BRIGHT_URL || "http://localhost:4000";

// Endpoint
export const ROUTE_ENDPOINT = {
  BASE_URL_V1: "/bright-backend/api",
  PING: "/ping",
};

// Mongodb
export const MONGO_URI = process.env.MONGO_URI || "mongodb://0.0.0.0:27017";
export const DB_NAME = process.env.DB_NAME || "bright";

// Credentials
export const AUTH_EMAIL = process.env.AUTH_EMAIL || "bright.pmtools@gmail.com";
export const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "c k l r e z a d z n m f o q v p";
export const GOOGLE_CLIENT_ID = "852626779740-jgr1dq6mh299pi4m24ag7t47dptct7kr.apps.googleusercontent.com";
export const GOOGLE_CLIENT_SECRET = "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";