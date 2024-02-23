import mongoose from 'mongoose';
import logger from './logger';
import { MONGO_URI, DB_NAME } from './config';

mongoose.set('strictQuery', false);

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info(`Mongodb connected ${MONGO_URI} : ${DB_NAME}`);
  } catch (error) {
    console.error(error);
    logger.error('Please make sure MongoDB is installed and running!');
    process.exit(1);
  }
};

export default connectToMongoDB;
