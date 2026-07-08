import mongoose from "mongoose";

export const connectDB = async () => {
  // 1. Configure active event-driven listeners on the connection lifecycle
  mongoose.connection.on("connected", () => {
    console.log("ℹ️ MongoDB Lifecycle: Connection established successfully.");
  });

  mongoose.connection.on("error", (err) => {
    console.error(
      `⚠️ MongoDB Lifecycle: Runtime database engine friction: ${err.message}`,
    );
  });

  mongoose.connection.on("disconnected", () => {
    console.warn(
      "⚠️ MongoDB Lifecycle: Connection dropped. Triggering automatic background retry loops...",
    );
  });

  // 2. Execute the initial boot connection attempt
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10, // Limits total concurrent database sockets
      serverSelectionTimeoutMS: 5000, // Fails fast if the database cluster is completely offline
    });

    console.log(
      `✅ Database Engine Ignited: Hosted at ${conn.connection.host}`,
    );
  } catch (error) {
    // CRITICAL: We only crash the server if the INITIAL boot connection fails.
    console.error(
      `❌ Critical Boot Error: Initial database connection refused: ${error.message}`,
    );
    process.exit(1);
  }
};
