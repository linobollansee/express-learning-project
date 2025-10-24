/**
 * Global Error Handling Middleware
 * --------------------------------
 * This Express middleware function handles errors that occur
 * during request processing and ensures that a consistent response
 * is sent to the client, depending on the request type (HTML, JSON, or plain text).
 */

module.exports = (err, req, res, next) => {
  // Log the error details to the console for debugging.
  console.error(err);

  // Set the response status code.
  // If the error object includes a custom status (e.g., 404, 400),
  // use that; otherwise default to 500 (Internal Server Error).
  res.status(err.status || 500);

  // Check if the client expects an HTML response.
  // If so, render an error page (e.g., 'views/error.ejs').
  if (req.accepts('html')) {
    return res.render('error', { error: err });
  }

  // If the client expects JSON (e.g., from an API request),
  // return a JSON-formatted error message.
  if (req.accepts('json')) {
    return res.json({ error: err.message || 'Internal Server Error' });
  }

  // Default fallback: send a plain text response if the
  // client does not accept HTML or JSON.
  res.type('txt').send(err.message || 'Internal Server Error');
};
