import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';
// import SSLCommerzPayment from 'sslcommerz-lts-ts';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';

const app: Application = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);

app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello world' });
});

app.use('/api/v1', router);

app.use(globalErrorHandler);
app.use(notFound);
export default app;
