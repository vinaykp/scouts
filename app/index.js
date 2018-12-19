import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes/index.js';

const app = express();
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
mongoose.connect(DB_URI + "/scoutsdb", { useNewUrlParser: true }, (err, db)=> {});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// catch 400
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(`Error: ${res.originUrl} not found`);
    next();
});

// catch 500
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send(`Error: ${err}`);
    next();
});

routes(app);

export default app;
