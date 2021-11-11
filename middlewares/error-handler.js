import { CustomAPIError } from "../errors/custom-error.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  if(err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({ error: err });
}

export default errorHandlerMiddleware;
