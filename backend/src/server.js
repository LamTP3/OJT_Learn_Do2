import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
const cors = require("cors");
require('dotenv').config();

let app = express();

const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
};
connectToMongo();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`backend nodejs is running on the port ${port}`);
})
