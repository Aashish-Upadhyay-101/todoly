import express, { Express } from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import { init } from './init';

dotenv.config();

const app: Express = express();

// initialize everything like database, queues, etc
app.use(async (req, res, next) => {
  try {
    await init();
    next();
  } catch (error) {
    next(error);
  }
});

export default app;
