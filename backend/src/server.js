import express from "express";
import { env } from "./config/environment.js"; // validates the load safely
import { connectDB } from "./config/db.js";
import userRoutes from "./router/userRoutes.js";
import { globalErrorHandler } from "./middleware/errorHandler/globalErrorHandler.js";
await connectDB();

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use(globalErrorHandler);
app.listen(env.port, () => {
  console.log(`Server is running at port: ${env.port}`);
});
