import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { whitelist } from "../middleware/whitelisting.js";
import { validateLength } from "../middleware/validationLenght.js";
const router = express.Router();

router.post(
  "/",
  whitelist(["username", "email", "password"]),
  validateLength({
    username: { min: 6, max: 15 },
    password: { min: 8 },
  }),
  createUser,
);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
