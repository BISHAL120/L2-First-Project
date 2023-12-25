import mongoose from 'mongoose';
import { TErrorSources, TGenericError } from '../interfaces/error';

const handleCastError = (error: mongoose.Error.CastError) : TGenericError => {
  const errorSources: TErrorSources = [{
    path: error.path,
    message: error.message,
  }]

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};

export default handleCastError;
