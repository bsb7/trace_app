import { sendErrorResponse } from "../utils/errorHandler.js";

export const whitelist = (allowedData) => (req, res, next) => {
  const cleanData = Object.create(null);
  const whitelistingErrors = [];

  allowedData.forEach((data) => {
    const value = req.body[data];
    // console.log(data);
    // console.log(value);
    if (value === undefined || value === null) {
      whitelistingErrors.push({ field: data, message: `${data} is required!` });
      return;
    }

    if (typeof value !== "string") {
      whitelistingErrors.push({
        field: data,
        message: `${data} should be String!`,
      });
      return;
    }

    const processValue = value.trim();
    if (processValue === "") {
      whitelistingErrors.push({
        field: data,
        message: `${data} cannot be empty!`,
      });
      return;
    }

    cleanData[data] = processValue;
  });

  if (whitelistingErrors.length > 0) {
    return sendErrorResponse(res, whitelistingErrors, 400);
  }

  req.body = cleanData;
  next();
};
