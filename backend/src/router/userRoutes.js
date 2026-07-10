import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { initValidationErrorBucket } from "../middleware/initializer/initValidationErrorBucket.js";
import { whitelisting } from "../middleware/validation/whitelisting.js";
import { checkErrors } from "../middleware/errorHandler/checkErrors.js";
import { dataTransform } from "../utils/transform/dataTransform.js";
import { validateEmail } from "../middleware/validation/validateEmail.js";
import { validateLength } from "../middleware/validation/validateLengjt.js";
import { validateUserName } from "../middleware/validation/validateUsername.js";
import { validatePassword } from "../middleware/validation/validatePassword.js";
const router = express.Router();

router.post(
  "/",
  initValidationErrorBucket,
  whitelisting(["username", "email", "password"]),
  dataTransform({ email: "lowercase" }),
  validateLength({
    username: { min: 8, max: 15 },
    password: { min: 8, max: 15 },
  }),
  validateEmail,
  validateUserName,
  validatePassword,
  checkErrors,
  createUser,
);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
