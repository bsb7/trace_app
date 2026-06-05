import dotenv from "dotenv";
// Load the environment variable
dotenv.config();

const requiredVariables = ["MONGO_URI"];
// check if critical variable is explicitely present
requiredVariables.forEach((variable) => {
  if (!process.env[variable]) {
    console.error(
      `❌ CRITICAL CONFIGURATION ERROR: Missing env variable [${variable}]`,
    );
    console.error(`The application is shutting down to prevent instability.`);
    process.exit(1); //force terminate the process emidiately
  }
});

export const env = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV || "development",
};
