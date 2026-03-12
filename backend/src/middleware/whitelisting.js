export const whitelist = (data) => (req, res, next) => {
  const cleanData = {};
  const emptyOrMissingFields = [];
  data.forEach((val) => {
    const value = req.body[val];
    if (value !== undefined && value !== null) {
      if (typeof value == "string" && value.trim() == "") {
        emptyOrMissingFields.push(val);
      } else {
        cleanData[val] = typeof value === "string" ? value.trim() : value;
      }
    } else {
      emptyOrMissingFields.push(val);
    }
  });
  if (emptyOrMissingFields.length > 0) {
    const label = `${emptyOrMissingFields.length > 1 ? "Fields are" : "Field is"} required`;

    return res.status(400).json({
      message: `${label} ${emptyOrMissingFields.join(", ")}`,
    });
  }
  //   console.log("cleanData");
  //   console.log(cleanData);
  //   console.log("missing data");
  //   console.log(emptyOrMissingFields);

  req.body = cleanData;
  next();
};
