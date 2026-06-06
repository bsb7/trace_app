import mongoose, { mongo } from "mongoose";
import { env } from "./environment.js";
// export const connectDB = async () => {
//   try {
//     const connect = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`✅ Connected to DB: ${connect.connection.host}`);
//     // console.log(`Connected to DB`);
//   } catch (error) {
//     console.error(`❌ Connection Error: ${error.message}`);
//     process.exit(1);
//   }
// };

export const connectDB = async () => {
  const mongooseOptions = {
    autoIndex: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  };

  // Hook active state monitoring
  mongoose.connection.on("connected", () => {
    console.log(
      `✅ Database Status: Connected to host [${mongoose.connection.host}]`,
    );
  });

  mongoose.connection.on("error", (err) => {
    console.error(`🔥 Database Status: Runtime Error -> ${err.message}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn(
      "⚠️ Database Status: Connection lost! Attempting background auto-recovery...",
    );
  });

  // execute connection attemp using our centralized variables
  try {
    await mongoose.connect(env.mongoUri, mongooseOptions);
  } catch (error) {
    console.error(`❌ Database Status: Critical initial connection failure!`);
    console.error(error.message);
    process.exit(1); // Fail-fast: Stop the app if it can't talk to the DB on initial boot
  }
};
