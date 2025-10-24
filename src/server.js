// Import the Express app instance from app.js
const app = require('./app');

// Import Node's built-in HTTP module to create a server
const http = require('http');

// Import dotenv to load environment variables from a .env file
const dotenv = require('dotenv');

// Load environment variables from .env file into process.env
dotenv.config();

// Get the PORT from environment variables, default to 3000 if not set
const PORT = process.env.PORT || 3000;

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Start the server and listen on the specified PORT
server.listen(PORT, () => {
  // Log a message indicating the server is running and its environment mode
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
