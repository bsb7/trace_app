import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./router/userRoutes.js";
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
