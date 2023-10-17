import { createClient } from 'redis';

const options: object = {
    port: 6379,
    host: '127.0.0.1'
};

const redisClient = createClient(options);

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis connected'));

export default redisClient;