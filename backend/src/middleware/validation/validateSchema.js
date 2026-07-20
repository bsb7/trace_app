export const validateSchema = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join(": "),
        message: issue.message,
      })),
    });
  }
  // 3. Store the validated and transformed request.
  req.validatedData = result.data;

  next();
};
