const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const createError = require('http-errors');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

// 404 handler (if no route handled)
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;
