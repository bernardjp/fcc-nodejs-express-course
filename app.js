import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.DEV_PORT || 4000;

app.get('/hello', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, console.log(`Server is listening on port ${port}`));
