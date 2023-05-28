import express from 'express';
import productRouter from './routers/productRouter';
import orderRouter from './routers/orderRouter';

const app = express();

app.use(express.json());
app.use(productRouter);
app.use(orderRouter);

export default app;
