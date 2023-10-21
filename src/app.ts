import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import basicAuth from 'express-basic-auth';

import redisClient from './service/redis/redisConfig';
import ResponseHandler from './service/utils/responseHandler';
import swaggerJSDoc from './swagger';
import swaggerUI from 'swagger-ui-express';

dotenv.config();

import {
    MORGAN_FORMAT,
    CORS_OPTIONS,
    USERNAME_API_DOCS,
    PASSWORD_API_DOCS,
    NODE_ENV,
} from './config';

const app = express();

// Set up logging middleware
if (['development', 'local', 'production'].includes(NODE_ENV)) {
    const morganStream = (statusCode: any) => (req: any, res: any) => !req.originalUrl.includes('api-docs') && res.statusCode >= statusCode;
    app.use(morgan(MORGAN_FORMAT, { skip: morganStream(400), stream: process.stderr }));
    app.use(morgan(MORGAN_FORMAT, { skip: morganStream(200), stream: process.stdout }));
} else {
    app.use(morgan(MORGAN_FORMAT, { skip: (req, res) => res.statusCode < 400, stream: process.stderr }));
    app.use(morgan(MORGAN_FORMAT, { skip: (req, res) => res.statusCode >= 400, stream: process.stdout }));
}

redisClient.connect();

// Enable CORS
app.use(cors(CORS_OPTIONS));

// Enable basic authentication for API docs
if (['production', 'development', 'local'].includes(NODE_ENV)) {
    app.use(
        '/bright-backend/api-docs',
        basicAuth({
            users: { [USERNAME_API_DOCS]: PASSWORD_API_DOCS },
            challenge: true,
        }),
        swaggerUI.serve, swaggerUI.setup(swaggerJSDoc)
    );
}

app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/assets', express.static('assets'));

// Handle Response
app.use((req, res: any, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.RH = new ResponseHandler(res);
    next();
});

export default app;
