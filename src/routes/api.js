// Import the Express framework
const express = require('express');

// Import validation functions from express-validator
const { body, param } = require('express-validator');

// Create a new router instance from Express
const router = express.Router();

// Import the users controller which contains the logic for handling user-related routes
const usersController = require('../controllers/usersController');

// Import custom middleware to handle validation results
const validate = require('../middleware/validate');

/**
 * Health check route
 * GET /api/health
 * Responds with a JSON object containing the status and server uptime.
 * Useful to quickly check if the API is running.
 */
router.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

/**
 * List all users
 * GET /api/users
 * Calls the usersController.list function to retrieve all users from the database.
 */
router.get('/users', usersController.list);

/**
 * Get a user by ID
 * GET /api/users/:id
 * Validates that the :id parameter is a positive integer.
 * If validation passes, calls usersController.getById.
 */
router.get(
  '/users/:id',
  param('id').isInt({ min: 1 }).withMessage('id must be a positive integer'), // validation rule
  validate, // middleware to handle validation errors
  usersController.getById
);

/**
 * Create a new user
 * POST /api/users
 * Validates the request body:
 * - name must be at least 2 characters
 * - email must be a valid email format
 * Calls usersController.create if validation passes.
 */
router.post(
  '/users',
  body('name').isLength({ min: 2 }).withMessage('name must be at least 2 characters'),
  body('email').isEmail().withMessage('email must be valid'),
  validate, // handles validation errors
  usersController.create
);

/**
 * Update an existing user by ID
 * PUT /api/users/:id
 * Validates:
 * - :id parameter must be a positive integer
 * - name and email fields in the body are optional but must follow their respective rules if provided
 * Calls usersController.update after validation.
 */
router.put(
  '/users/:id',
  param('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
  body('name').optional().isLength({ min: 2 }),
  body('email').optional().isEmail(),
  validate,
  usersController.update
);

/**
 * Delete a user by ID
 * DELETE /api/users/:id
 * Validates that the :id parameter is a positive integer.
 * Calls usersController.remove to delete the user.
 */
router.delete(
  '/users/:id',
  param('id').isInt({ min: 1 }),
  validate,
  usersController.remove
);

// Export the router so it can be used in the main app
module.exports = router;
