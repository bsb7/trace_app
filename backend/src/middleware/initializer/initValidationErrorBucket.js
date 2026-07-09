export const initValidationErrorBucket = (req, res, next) => {
  if (!req.middlewareErrors) {
    req.middlewareErrors = [];
  }
  next();
};
