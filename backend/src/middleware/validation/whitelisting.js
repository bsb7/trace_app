import { trimString } from "../../utils/transform/trimString.js";
export const whitelisting = (fields) => (req, res, next) => {
  const cleanData = {};

  Object.keys(req.body).forEach((field) => {
    if (!fields.includes(field)) {
      req.middlewareErrors.push({
        field,
        message: `${field} is not allowed`,
      });
    }
  });
  fields.forEach((field) => {
    const val = trimString(req.body[field]);
    if (val == undefined || val == null || val == "") {
      req.middlewareErrors.push({
        field,
        message: `${field} is required`,
      });
    } else {
      cleanData[field] = val;
    }
  });

  req.body = cleanData;
  next();
};
