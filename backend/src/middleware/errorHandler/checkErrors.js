export const checkErrors = (req, res, next) => {
  const errors = req.middlewareErrors ?? [];

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors,
    });
  }
  next();
};
