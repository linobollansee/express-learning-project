module.exports = (req, res, next) => {
  res.status(404);
  // respond with html page if browser asked for it
  if (req.accepts('html')) {
    return res.render('404', { url: req.originalUrl });
  }
  // else send json
  if (req.accepts('json')) {
    return res.json({ error: 'Not found' });
  }
  res.type('txt').send('Not found');
};
