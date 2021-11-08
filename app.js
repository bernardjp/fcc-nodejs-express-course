import express from 'express';
import tasksRoutes from './routes/tasksRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// API endpoint configuration
const APICurrentVersion = 'v1';
const APIEndpointStart = `/api/${APICurrentVersion}`;

// Middleware
app.use(express.json());

// Routing
app.use(`${APIEndpointStart}/tasks`, tasksRoutes);

const PORT = process.env.DEV_PORT || 4000;
app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
