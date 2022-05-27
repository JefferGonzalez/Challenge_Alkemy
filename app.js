import express from "express";
import morgan from "morgan";

import operationRoutes from "./app/Routes/OperationRoutes";

const app = express();

app.set('port' , 8080);

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/home',operationRoutes);

export default app;