import APIError from '../utils/APIError';
import redisClient from '../redis/redisConfig';
import { ERROR_CODE } from '../utils/constants';

// Get the user's IP
const getIpUser = (req: any) => {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
};

// Rate limiting configuration (5 requests per 3 seconds)
const RATE_LIMIT = {
    requestsPerSecond: 5,
    seconds: 3,
};

// Middleware function to check for IP spamming
export function checkIpSpamServer(endpoint = '') {
    return async (req: any, res: any, next: any) => {
        try {
            const ipUser = await getIpUser(req);
            const keyRequest = `${ipUser}-${endpoint}`;
            const numRequest = await redisClient.incr(keyRequest);

            if (numRequest === 1) {
                await redisClient.expire(keyRequest, RATE_LIMIT.seconds);
            }

            if (numRequest > RATE_LIMIT.requestsPerSecond) {
                console.log('IP Spam detected:', { access: false, message: ERROR_CODE.RATELIMITED });

                return next(new APIError(502, { access: false, message: ERROR_CODE.RATELIMITED }));
            }

            // Continue to the next middleware or route
            return next();
        } catch (error) {
            console.error('Error in IP spam checking middleware:', error);
            return next(new APIError(502, { access: false, message: ERROR_CODE.RATELIMITED }));
        }
    };
}

