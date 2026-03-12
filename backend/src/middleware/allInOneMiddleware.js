export const whitelist = (fields) => (req, res, next) => {
  const cleanData = {};
  const missingOrEmpty = [];

  fields.forEach((field) => {
    const value = req.body[field];
    // console.log(value, typeof value);
    // 1. Check if it exists AND is not just whitespace
    if (
      value !== undefined &&
      typeof value === "string" &&
      value.trim() !== ""
    ) {
      cleanData[field] = value.trim(); // Assign and Clean!
    } else {
      missingOrEmpty.push(field); // Track what's missing
    }
  });

  // 2. The Guard: If any required fields are missing, return early
  if (missingOrEmpty.length > 0) {
    return res.status(400).json({
      message: `The following fields are required and cannot be empty: ${missingOrEmpty.join(", ")}`,
    });
  }

  // 3. Success: Overwrite req.body with only the clean data
  req.body = cleanData;
  next();
};
