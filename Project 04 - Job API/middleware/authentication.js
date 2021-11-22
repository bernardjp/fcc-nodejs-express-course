// import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const authMiddleware = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if(!authHeaders || !authHeaders.startsWith('Bearer')) throw new UnauthenticatedError('Authentication invalid');

  const token = authHeaders.split(' ')[1];
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userID, username: payload.name };
    next();
  } catch(error) {
    console.log(error);
    throw new UnauthenticatedError('Authentication invalid');
  }
}

export default authMiddleware;
