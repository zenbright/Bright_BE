import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
// import app from './app';
import app from '../src/app';
import { PORT_SERVER, CORS_OPTIONS } from './config';
import logger from './logger';
dotenv.config();
app.enable('trust proxy');
app.use(cors(CORS_OPTIONS));
app.use(compression());
app.listen(PORT_SERVER, () => {
    // ? Logging restart service
    logger.info(`Server is running on port ${PORT_SERVER}`);
    console.log(`Server is running on port ${PORT_SERVER}`);
});
