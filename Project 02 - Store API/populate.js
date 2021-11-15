import { readFileSync } from 'fs';
import { productModel } from './models/productModel.js';
import { connectDB } from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();

const populateDB = async (data) => {
  try {
    await connectDB(process.env.DB_CONNECTION_STRING);
    await productModel.deleteMany();
    await productModel.create(data);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const storeData = JSON.parse(readFileSync('./products.json'));
populateDB(storeData);
