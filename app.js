import express from "express";
import morgan from "morgan";

import operationRoutes from "./app/Routes/OperationRoutes";

const app = express();

app.set('port' , 4000);

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/main/',operationRoutes);

export default app;