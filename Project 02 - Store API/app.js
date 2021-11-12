import express from 'express';
import { connectDB } from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

connectDB(process.env.DB_CONNECTION_STRING)
  .then(() => {
    const PORT = process.env.PORT || 4000;
    console.log('DB connected')
    app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`))
  })
  .catch(error => console.log(error))
