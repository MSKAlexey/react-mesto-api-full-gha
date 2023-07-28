const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // const token = req.headers.authorization;
  const { authorization } = req.headers;

  if (!authorization.startsWith('Bearer')) {
    next(res.status(401));
  }
  const token = authorization.split('Bearer ')[1];

  let payload;
  try {
    payload = jwt.verify(token, process.env['JWT-SECRET']);
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
};

module.exports = auth;
