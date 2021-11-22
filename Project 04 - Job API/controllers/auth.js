import UserModel from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

const register = async (req, res) => {
  const user = await UserModel.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) throw new BadRequestError('Please provide email and password');

  const user = await UserModel.findOne({ email });
  if(!user) throw new UnauthenticatedError('Invalid credential');

  const isPasswordCorrect = await user.comparePassword(password);
  if(!isPasswordCorrect) throw new UnauthenticatedError('Invalid credential');

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

export { register, login };
