import UserModel from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
// import jwt from 'jsonwebtoken';
// import { BadRequestError } from '../errors';

const register = async (req, res) => {
  const newUser = await UserModel.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ msg: 'Success: User created.', data: newUser });
}

const login = async (req, res) => {
  res.send('Logged on User');
}

export { register, login };
