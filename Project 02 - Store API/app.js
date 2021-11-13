import express from 'express';
import 'express-async-errors';
import { connectDB } from './db/connect.js';
import productsRouter from './routes/productsRoutes.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routing
app.get('/', (req, res) => res.send('<h1>STORE API</h1><a href="/api/v1/products">Products route</a>'));
app.use('/api/v1/products', productsRouter);

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
