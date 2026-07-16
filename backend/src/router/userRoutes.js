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
import { pagination } from "../middleware/request/pagination.js";
import { validateObjId } from "../middleware/validation/validateObjId.js";
const router = express.Router();

router.post(
  "/",
  initValidationErrorBucket,
  whitelisting({
    required: ["username", "email", "password"],
  }),
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
router.get("/", pagination, getAllUsers);
router.get(
  "/:id",
  initValidationErrorBucket,
  validateObjId,
  checkErrors,
  getUser,
);
router.patch(
  "/:id",
  initValidationErrorBucket,
  validateObjId,
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
  updateUser,
);
router.delete(
  "/:id",
  initValidationErrorBucket,
  validateObjId,
  checkErrors,
  deleteUser,
);

export default router;
