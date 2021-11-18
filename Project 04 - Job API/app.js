import express from 'express';
import 'express-async-errors';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// body-parser
app.use(express.json());

// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

// error-handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// server setup
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
