const { createCustomError } =require ("../errors/customErrors.js");

module.exports = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      return next(createCustomError(error, 400));
    }
  };
}
