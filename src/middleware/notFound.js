/**
 * 404 Not Found Middleware
 * ------------------------
 * This Express middleware handles requests that don't match
 * any defined routes. It ensures the server responds gracefully
 * when a user tries to access a non-existent endpoint or resource.
 */

module.exports = (req, res, next) => {
  // Set the HTTP status code to 404 (Not Found)
  res.status(404);

  // If the client accepts HTML (e.g., a web browser),
  // render a custom 404 error page and include the requested URL.
  if (req.accepts('html')) {
    return res.render('404', { url: req.originalUrl });
  }

  // If the client expects JSON (e.g., an API consumer),
  // respond with a structured JSON error message.
  if (req.accepts('json')) {
    return res.json({ error: 'Not found' });
  }

  // Fallback: if the client doesn't accept HTML or JSON,
  // send a plain text response instead.
  res.type('txt').send('Not found');
};
