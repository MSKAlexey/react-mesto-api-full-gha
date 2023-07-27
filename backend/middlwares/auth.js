const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // const token = req.cookies.jwt;
  const token = req.headers.replace('Bearer ', '');
  console.log(token);

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
