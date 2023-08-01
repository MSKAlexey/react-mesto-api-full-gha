/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorHandler = require('./errors/errors');
const cors = require('./middlwares/cors');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
app.use(helmet());
app.use(cors);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(routes);

app.use(limiter);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
