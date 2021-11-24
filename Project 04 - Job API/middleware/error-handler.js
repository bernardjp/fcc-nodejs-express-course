import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later'
  }

  // Duplication Error.
  if(err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = `Invalid value entered for ${Object.keys(err.keyValue)}. Please enter another value.`;
  }

  // Validation Error.
  if(err.name === 'ValidationError') {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = Object.values(err.errors).map(item => item.message).join('. ');
  }

  // Cast Error.
  if(err.name === 'CastError') {
    customError.statusCode = StatusCodes.NOT_FOUND;
    customError.msg = `Invalid value. No resource found with ${err.path}: ${err.value}.`
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
}

export default errorHandlerMiddleware;
