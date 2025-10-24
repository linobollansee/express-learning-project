// Import the Express framework
const express = require('express');

// Create a new router instance from Express
const router = express.Router();

// Import the home controller which contains logic for rendering home-related pages
const homeController = require('../controllers/homeController');

/**
 * Home page route
 * GET /
 * Calls homeController.index to render the home page.
 */
router.get('/', homeController.index);

/**
 * Users page route
 * GET /users
 * Calls homeController.usersPage to render a page listing users.
 */
router.get('/users', homeController.usersPage);

// Export the router so it can be mounted in the main app
module.exports = router;
