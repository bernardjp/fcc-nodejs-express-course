import express from 'express';
import 'express-async-errors';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import mainRoutes from './routes/main.js';
import connectDB from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// middleware
app.use(express.static('./public'));
app.use(express.json());

// routing
app.use('/api/v1', mainRoutes);

// error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// server setup
const start = async () => {
  const port = process.env.PORT || 3000;

  try {
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
