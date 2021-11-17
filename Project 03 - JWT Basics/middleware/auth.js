import jwt from 'jsonwebtoken';
import CustomError from '../errors/custom-error.js';

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new CustomError('No Token provided', 401));
  }
  
  const token = authHeader.split(' ')[1];

  try {
    const { id, username } = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id, username };
    next();
  } catch (err) {
    return next(new CustomError('Not authorized to access this route', 401));
  }
}

export default authenticationMiddleware;
