/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interfaces/error';
import config from '../config';
import handleZodError from '../Error/handleZodError';
import handleValidationError from '../Error/handleValidationError';
import handleCastError from '../Error/handleCastError';
import handleDuplicateID from '../Error/handleDupplicateID';
import appError from '../Error/appError';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = 'something went wrong';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'something went wrong',
    }
  ];


  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateID(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error instanceof appError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorSources = [{
      path: '',
      message: error?.message,
    }];
  } else if (error instanceof Error) {
    message = error.message;
    errorSources = [{
      path: '',
      message: error?.message,
    }];
  }


  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error.stack : null
  });
};

export default globalErrorHandler;
