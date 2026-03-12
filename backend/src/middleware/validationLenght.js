export const validateLength = (requirements) => (req, res, next) => {
  const lengthErrors = [];

  // requirements looks like: { username: { min: 3, max: 20 }, password: { min: 8 } }
  Object.keys(requirements).forEach((field) => {
    const value = req.body[field];
    const limits = requirements[field];
    console.log(req.body);
    if (value) {
      if (limits.min && value.length < limits.min) {
        lengthErrors.push(`${field} must be at least ${limits.min} characters`);
      }
      if (limits.max && value.length > limits.max) {
        lengthErrors.push(`${field} cannot exceed ${limits.max} characters`);
      }
    }
  });

  if (lengthErrors.length > 0) {
    return res.status(400).json({
      errors: lengthErrors,
    });
  }

  next();
};
