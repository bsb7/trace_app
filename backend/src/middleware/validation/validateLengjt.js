export const validateLength = (requirements) => (req, res, next) => {
  Object.keys(requirements).forEach((field) => {
    const value = req.body[field];
    const limit = requirements[field];
    if (value) {
      if (limit.min && value.length < limit.min) {
        req.middlewareErrors.push({
          field: field,
          message: `${field} must be at least ${limit.min} characters long.`,
        });
      }
      if (limit.max && value.length > limit.max) {
        req.middlewareErrors.push({
          field: field,
          message: `${field} must not exceed ${limit.max} characters.`,
        });
      }
    }
  });
  next();
};
