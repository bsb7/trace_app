export const validatePassword = (req, res, next) => {
  const { password } = req.body;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=]).+$/;

  if (!passwordRegex.test(password)) {
    req.middlewareErrors.push({
      field: "password",
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  next();
};
