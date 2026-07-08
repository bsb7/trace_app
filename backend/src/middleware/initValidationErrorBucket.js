export const middlewareErrors = (req) => {
  if (!req.middlewareErrors) {
    req.middlewareErrors = [];
  }
};
