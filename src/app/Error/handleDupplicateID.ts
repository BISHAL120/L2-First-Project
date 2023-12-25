import { TErrorSources } from '../interfaces/error';

const handleDuplicateID = (error: any) => {

    const match = error.message.match(/"([^"]*)"/);

    const extractedMessage = match && match[1];


  const errorSources: TErrorSources = [{
    path: '',
    message: `${extractedMessage} is Already exists`,
  }]

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};

export default handleDuplicateID;
