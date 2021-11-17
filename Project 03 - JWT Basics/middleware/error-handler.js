import { CustomAPIError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again later')
}

export default errorHandlerMiddleware;
