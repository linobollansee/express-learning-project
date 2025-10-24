module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  if (req.accepts('html')) {
    return res.render('error', { error: err });
  }
  if (req.accepts('json')) {
    return res.json({ error: err.message || 'Internal Server Error' });
  }
  res.type('txt').send(err.message || 'Internal Server Error');
};
