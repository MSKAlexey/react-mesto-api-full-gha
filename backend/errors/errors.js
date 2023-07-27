/* eslint-disable no-unused-vars */
// eslint-disable-next-line max-classes-per-file
class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = 404;
  }
}

class GeneralError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Ошибка на стороне сервера';
    this.statusCode = 500;
  }
}

class AuthorizationError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Авторизуйтесь';
    this.statusCode = 401;
  }
}

class EmailDuplicateError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Такой email уже зарегестрирован';
    this.statusCode = 409;
  }
}

class ForbiddenError extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = 403;
  }
}

class IncorrectDataError extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = 400;
  }
}

class ValidationError extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = 400;
  }
}

class EmailNotFoundError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Такой email не зарегестрирован';
    this.statusCode = 401;
  }
}

const errorHandler = (err, req, res, next) => {
  let error;
  if (err.statusCode === 409) {
    error = new EmailDuplicateError(err);
  } else if (err.statusCode === 404) {
    error = new NotFoundError(err);
  } else if (err.statusCode === 403) {
    error = new ForbiddenError(err);
  } else if (err.statusCode === 401) {
    error = new EmailNotFoundError(err);
  } else if (err.statusCode === 400) {
    error = new IncorrectDataError(err);
  } else if (err.name === 'ValidationError') {
    error = new ValidationError(err);
  } else if (err.name === 'JsonWebTokenError' || err.statusCode === 401) {
    error = new AuthorizationError(err);
  } else {
    error = new GeneralError(err);
  }

  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
