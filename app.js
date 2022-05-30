import express from "express";
import morgan from "morgan";
import operationRoutes from "./app/Routes/OperationRoutes";
import categoryRoutes from "./app/Routes/CategoryRoutes";
import userRoutes from "./app/Routes/UserRoutes";

var cors = require('cors');
const app = express();
const path = require('path');

app.set('port' , 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use('/api/v1/operations',operationRoutes);
app.use('/api/v1/categories',categoryRoutes);
app.use('/api/v1/users',userRoutes);

export default app;