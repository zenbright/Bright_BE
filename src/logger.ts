import winston from 'winston';
import moment from 'moment';
import { NODE_ENV } from './config';

// Define log level based on environment
const level = NODE_ENV === 'production' ? 'info' : 'debug';

// Create a custom format for the log messages
const loggerFormat = winston.format.printf(({ level, message, timestamp }) => {
    const convertTimeStamp = moment(timestamp).format('DD-MM-YYYY HH:mm:ss');
    return `${convertTimeStamp} ${level} : ${message}`;
});

// Configure transports for different log files
const transports = [
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
];

// Add info and debug logs for development and local environments
if (NODE_ENV !== 'production') {
    transports.push(new winston.transports.File({ filename: 'logs/info.log', level: 'info' }));
    transports.push(new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }));
}

// Create the logger instance
const logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), loggerFormat),
    transports,
});

// Write log to console for non-production environments
if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        level,
        format: winston.format.simple(),
    }));
}

export default logger;