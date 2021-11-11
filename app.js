import express from 'express';
import tasksRoutes from './routes/tasksRoutes.js';
import { notFound } from './middlewares/not-found.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import { connectDB } from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// API endpoint configuration
// TO-DO: keep this variables as enviromental variables (?)
const APICurrentVersion = 'v1';
const APIEndpointStart = `/api/${APICurrentVersion}`;

// DB Connection configuration
connectDB(process.env.DB_CONNECTION_STRING)
  .then(() => {
    const PORT = process.env.DEV_PORT || 4000;
    console.log('DB Connected');
    app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
  })
  .catch(error => console.log(error));

// Middleware
app.use(express.static('./public'));
app.use(express.json());

// Routing
app.use(`${APIEndpointStart}/tasks`, tasksRoutes);

// Error Handlers
app.use(notFound);
app.use(errorHandlerMiddleware);
