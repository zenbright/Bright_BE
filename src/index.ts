export * as IPSpamChecker from "./service/middleware/api.limiter";
export * as APIValidator from "./service/middleware/api.validator";

import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';
import app from '../src/app';
import { PORT_SERVER, CORS_OPTIONS, MONGO_URI, DB_NAME } from './config';
import logger from './logger';
import redisClient from "./service/redis/redisConfig";

dotenv.config();

app.enable('trust proxy');

app.use(cors(CORS_OPTIONS));

app.use(compression());

// Connect to Redis
redisClient.connect();

// MongoDB Connection
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI).then(async (data) => {
    logger.info(`Mongodb connected ${MONGO_URI} : ${DB_NAME}`);
})
    .catch((error) => {
        console.log(error);
        logger.error('Please make sure Mongodb is installed and running!');
        process.exit(1);
    });

app.listen(PORT_SERVER, () => {
    // ? Logging restart service
    logger.info(`Server is running on port ${PORT_SERVER}`);
    console.log(`Server is running on port ${PORT_SERVER}`);
});