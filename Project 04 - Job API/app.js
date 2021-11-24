import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authRouter from './routes/auth.js';
import jobsRouter from './routes/jobs.js';
import authenticateUser from './middleware/authentication.js';
import connectDB from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const apiPath = '/api/v1';

// body-parser
app.use(express.json({ limit: '10kb' }));

// extra packages
app.use(rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: 'Request denied. You have reached the API request limit. Try again later.'
}));
app.use(helmet());
app.use(xss());
app.use(cors());

// routes
app.get(`${apiPath}`, (req, res) => res.send('jobs api'));
app.use(`${apiPath}/auth`, authRouter);
app.use(`${apiPath}/jobs`, authenticateUser, jobsRouter);

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
