export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    req.middlewareErrors.push({
      field: "email",
      message: "Invalid email format",
    });
  }

  next();
};
