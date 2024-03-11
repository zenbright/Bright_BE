import { createClient } from 'redis';

const options: object = {
    url: ' redis://redis:6379',
};

const redisClient = createClient(options);

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis connected'));

export default redisClient;