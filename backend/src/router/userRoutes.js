import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { pagination } from "../middleware/request/pagination.js";
import { validateObjId } from "../middleware/validation/validateObjId.js";
import { validateSchema } from "../middleware/validation/validateSchema.js";
import {
  createUserSchema,
  deleteUserSchema,
  getAllUsersSchema,
  getUserSchema,
  updateUserSchema,
} from "../schema/userSchema.js";
const router = express.Router();

router.post("/", validateSchema(createUserSchema), createUser);
router.get("/", validateSchema(getAllUsersSchema), pagination, getAllUsers);
router.get("/:id", validateSchema(getUserSchema), getUser);
router.patch("/:id", validateSchema(updateUserSchema), updateUser);
router.delete("/:id", validateSchema(deleteUserSchema), deleteUser);

export default router;
