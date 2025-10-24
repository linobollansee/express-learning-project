// Import dependencies
const express = require('express');         // Express framework for handling routes and middleware
const path = require('path');               // Node module to work with file and directory paths
const morgan = require('morgan');           // HTTP request logger middleware
const helmet = require('helmet');           // Security middleware to set HTTP headers
const cors = require('cors');               // Middleware to enable Cross-Origin Resource Sharing
const createError = require('http-errors'); // Module to create HTTP errors easily

// Import routers
const indexRouter = require('./routes/index'); // Router for the main (web) routes
const apiRouter = require('./routes/api');     // Router for API routes

// Import custom middleware
const notFound = require('./middleware/notFound');       // Middleware for handling 404 Not Found errors
const errorHandler = require('./middleware/errorHandler'); // Middleware for handling general errors

// Initialize Express app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views')); // Set the folder where view templates are located
app.set('view engine', 'ejs');                  // Set EJS as the view engine

// Middlewares
app.use(helmet()); // Add security-related HTTP headers
app.use(cors());   // Enable CORS for all routes
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve static files from public directory
app.use(express.json());          // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data from forms
app.use(morgan('dev'));           // Log HTTP requests in development format

// Routes
app.use('/', indexRouter);     // Mount the index router on the root path
app.use('/api', apiRouter);   // Mount the API router on /api path

// 404 handler (if no route handled the request)
app.use(notFound);

// General error handler
app.use(errorHandler);

// Export the app instance to be used by server.js
module.exports = app;
