export const dataTransformLowerCase = (data) => (req, res, next) => {
  data.forEach((field) => {
    const value = req.body[field];
    if (value && typeof value === "string") {
      req.body[field] = value.toLocaleLowerCase();
    }
  });

  next();
};
