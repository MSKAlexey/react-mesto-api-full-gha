module.exports = class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.message = err.message;
    this.statusCode = 404;
  }
};
