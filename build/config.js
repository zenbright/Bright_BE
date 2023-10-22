// Desc: Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();
export const PORT_SERVER = process.env.PORT_SERVER || 4000;
export const NODE_ENV = process.env.NODE_ENV || 'local';
export const SERVER_ORIGIN = process.env.SERVER_ORIGIN || '*';
export const CORS_OPTIONS = {
    origin: SERVER_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization,Accept-Language',
};
// Request logger
export const MORGAN_FORMAT = ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';
export const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE;
export const PASSWORD_API_DOCS = process.env.PASSWORD_API_DOCS || 'admin';
export const USERNAME_API_DOCS = process.env.USERNAME_API_DOCS || 'admin';
export const API_DOCS_HOST = process.env.API_DOCS_HOST || 'localhost:4000';
export const BRIGHT_URL = process.env.BRIGHT_URL || 'http://localhost:4000';
export const ROUTE_ENDPOINT = {
    BASE_URL_V1: '/bright-backend/api-docs',
    PING: '/ping',
};
