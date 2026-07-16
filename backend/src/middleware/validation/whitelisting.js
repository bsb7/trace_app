import { trimString } from "../../utils/transform/trimString.js";
export const whitelisting =
  ({ required = [], optional = [] }) =>
  (req, res, next) => {
    const cleanData = {};
    const allowedFields = [...required, ...optional];
    Object.keys(req.body).forEach((field) => {
      if (!allowedFields.includes(field)) {
        req.middlewareErrors.push({
          field,
          message: `${field} is not allowed`,
          statusCode: 400,
        });
      }
    });

    required.forEach((field) => {
      const value = req.body[field];

      if (value === undefined || value === null || value === "") {
        req.middlewareErrors.push({
          field,
          message: `${field} is required`,
          statusCode: 400,
        });
      } else {
        cleanData[field] = value;
      }
    });

    optional.forEach((field) => {
      const value = req.body[field];

      if (value !== undefined) {
        cleanData[field] = value;
      }
    });

    req.body = cleanData;
    next();
  };
