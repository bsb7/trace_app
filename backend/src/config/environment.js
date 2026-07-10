import dotenv from "dotenv";

// add dotenv.config() - to read .env file
dotenv.config();
// initialize required variables
const requiredVariables = ["MONGO_URI", "PORT"];
//initialize error accumulator
const missingVariables = [];

// look into error accumulator if there is an error or not
requiredVariables.forEach((val) => {
  if (!process.env[val]) {
    missingVariables.push(val);
  }
});
//fail fast check if there is an error
if (missingVariables.length > 0) {
  console.log(
    `❌ Critical Error: Environmental ${missingVariables.length > 1 ? "Variables" : "Variable"} ${missingVariables.join(", ")} are missing`,
  );
  process.exit(1);
}
//export variables

export const env = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
};
