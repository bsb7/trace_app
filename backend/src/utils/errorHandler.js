export const sendErrorResponse = (res, errors, statusCode = 400) => {
  console.log(errors);
  const formattedErrors = Array.isArray(errors)
    ? errors
    : [{ message: errors }];

  return res.status(statusCode).json({
    success: false,
    errors: formattedErrors,
  });
};

export const checkForErrors = (req, res, next) => {
  const errors = req.middlewareError || [];

  if (errors.length > 0) {
    return sendErrorResponse(res, errors, 400);
  }
  next();
};
