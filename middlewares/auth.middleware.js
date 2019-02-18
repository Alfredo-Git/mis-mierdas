const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    if (req.method === 'GET' && req.query.url) {
      res.status(401)
        .redirect('/?url=' + escape(req.query.url));
    } else {
      res.status(401)
        .redirect('/');
    }
  }
}