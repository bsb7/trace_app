export const validateUserName = (req, res, next) => {
  const { username } = req.body;
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    req.middlewareErrors.push({
      field: "username",
      message: `Username may only contain letters, numbers, and underscores.`,
    });
  }
  next();
};
