import UserModel from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';

const register = async (req, res) => {
  const user = await UserModel.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req, res) => {
  res.send('Logged on User');
}

export { register, login };
