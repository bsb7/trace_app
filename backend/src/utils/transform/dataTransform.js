export const dataTransform = (rules) => (req, res, next) => {
  // rules example: { email: 'lowercase', username: 'lowercase' }
  Object.keys(rules).forEach((field) => {
    const value = req.body[field];
    const action = rules[field];

    if (value) {
      if (action == "lowercase") {
        req.body[field] = value.toLowerCase();
      }
      if (action == "uppercase") {
        req.body[field] = value.toUpperCase();
      }
    }
  });
  next();
};
