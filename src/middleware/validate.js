/**
 * Validation Middleware
 * ---------------------
 * This middleware works with `express-validator` to handle
 * validation errors from request data (e.g., body, query, params).
 * 
 * Usage:
 *  - Attach this middleware **after** your validation rules
 *    and **before** your route handler.
 *  - If validation fails, it sends a 422 (Unprocessable Entity) response
 *    containing the list of validation errors.
 */

const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  // Extracts validation results from the request.
  // express-validator attaches them automatically after validation checks.
  const errors = validationResult(req);

  // If there are validation errors, respond with HTTP 422
  // and send the array of errors in JSON format.
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // If no validation errors exist, move on to the next middleware or route handler.
  next();
};
