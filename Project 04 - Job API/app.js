import express from 'express';
import 'express-async-errors';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authRouter from './routes/auth.js';
import jobsRouter from './routes/jobs.js';
import connectDB from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const apiPath = '/api/v1';

// body-parser
app.use(express.json());

// extra packages

// routes
app.get(`${apiPath}`, (req, res) => res.send('jobs api'));
app.use(`${apiPath}/auth`, authRouter);
app.use(`${apiPath}/jobs`, jobsRouter);

// error-handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// server & db connection setup
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Database connected');
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
