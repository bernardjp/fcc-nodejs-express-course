import express from 'express';
import { connectDB } from './db/connect.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Body-parser
app.use(express.json());

// Routing
app.get('/', (req, res) => res.send('<h1>STORE API</h1><a href="/api/v1/products">Products route</a>'));

// Error Handling
app.use(notFound);
app.use(errorHandlerMiddleware);

connectDB(process.env.DB_CONNECTION_STRING)
  .then(() => {
    const PORT = process.env.PORT || 4000;
    console.log('DB connected')
    app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`))
  })
  .catch(error => console.log(error))
