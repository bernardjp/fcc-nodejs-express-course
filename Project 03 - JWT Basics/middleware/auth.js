import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw UnauthenticatedError('No Token provided');
  }
  
  const token = authHeader.split(' ')[1];

  try {
    const { id, username } = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id, username };
    next();
  } catch (err) {
    throw UnauthenticatedError('Not authorized to access this route');
  }
}

export default authenticationMiddleware;
