import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/index.js';

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) throw new BadRequestError('Please provide email and password');

  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn:'30d' });

  res.status(200).json({ username, token });
}

const dashboard = (req, res) => {
  const { username, id } = req.user;
  const luckyNumber = Math.floor(Math.random() * 100);
  
  res.status(200).json({ msg: `Hello ${username}, ID: ${id}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` }); 
}

export { login, dashboard };