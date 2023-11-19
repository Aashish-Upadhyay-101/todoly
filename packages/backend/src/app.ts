import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.use(express.json());

export default app;
