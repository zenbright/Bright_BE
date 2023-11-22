// Desc: Load environment variables from .env file
import dotenv from 'dotenv';

dotenv.config();

export const PORT_SERVER = process.env.PORT_SERVER || 4000;
export const NODE_ENV: string = process.env.NODE_ENV || 'local';

export const SERVER_ORIGIN: string = process.env.SERVER_ORIGIN || '*';

export const CORS_OPTIONS: object = {
    origin: SERVER_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:
        'Origin,X-Requested-With,Content-Type,Accept,Authorization,Accept-Language',
};

// Request logger
export const MORGAN_FORMAT: string =
    ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';

export const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE;
export const PASSWORD_API_DOCS: string =
    process.env.PASSWORD_API_DOCS || 'admin';
export const USERNAME_API_DOCS: string =
    process.env.USERNAME_API_DOCS || 'admin';

export const API_DOCS_HOST: string = process.env.API_DOCS_HOST || 'localhost:4000';
export const BRIGHT_URL: string = process.env.BRIGHT_URL || 'http://localhost:4000';
export const ROUTE_ENDPOINT = {
    BASE_URL_V1: '/bright-backend/api',
    PING: '/ping',
};

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://0.0.0.0:27017';
export const DB_NAME = process.env.DB_NAME || 'bright';
