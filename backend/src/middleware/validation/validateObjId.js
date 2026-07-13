import mongoose from "mongoose";
export const validateObjId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.middlewareErrors.push({
      field: id,
      message: `Invalid User Id`,
      statusCode: 400,
    });
  }
  next();
};
