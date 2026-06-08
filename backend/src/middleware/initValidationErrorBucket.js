export const initValidationErrorBucket = (req, res, next) => {
  req.middlewareError = [];
  next();
};
