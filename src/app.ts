import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  Promise.reject();
  // const a = 10;
  // res.send(a);
};

app.get('/', test);

app.use(globalErrorHandler);

// not Found
app.use(notFound);

export default app;
