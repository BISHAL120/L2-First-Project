import mongoose from 'mongoose';
import { TErrorSources, TGenericError } from '../interfaces/error';

const handleValidationError = (error: mongoose.Error.ValidationError) : TGenericError => {
  const errorSources: TErrorSources = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'VAlidation Error',
    errorSources,
  };
};

export default handleValidationError;
