var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import APIError from '../utils/APIError';
import redisClient from '../utils/redisConfig';
import { RESPONSE_CODE } from '../utils/constants';
// Get the user's IP
const getIpUser = (req) => {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
};
// Rate limiting configuration (5 requests per 3 seconds)
const RATE_LIMIT = {
    requestsPerSecond: 5,
    seconds: 3,
};
// Middleware function to check for IP spamming
export function checkIpSpamServer(endpoint = '') {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const ipUser = yield getIpUser(req);
            const keyRequest = `${ipUser}-${endpoint}`;
            const numRequest = yield redisClient.incr(keyRequest);
            if (numRequest === 1) {
                yield redisClient.expire(keyRequest, RATE_LIMIT.seconds);
            }
            if (numRequest > RATE_LIMIT.requestsPerSecond) {
                console.log('IP Spam detected:', { access: false, message: RESPONSE_CODE.RATELIMITED });
                return next(new APIError(502, { access: false, message: RESPONSE_CODE.RATELIMITED }));
            }
            // Continue to the next middleware or route
            return next();
        }
        catch (error) {
            console.error('Error in IP spam checking middleware:', error);
            return next(new APIError(502, { access: false, message: RESPONSE_CODE.INTERNAL_SERVER_ERROR }));
        }
    });
}
