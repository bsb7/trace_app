import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from "../controllers/noteController.js";
import { initValidationErrorBucket } from "../middleware/initializer/initValidationErrorBucket.js";
import { whitelisting } from "../middleware/validation/whitelisting.js";
import { checkErrors } from "../middleware/errorHandler/checkErrors.js";
import { pagination } from "../middleware/request/pagination.js";
import { validateObjId } from "../middleware/validation/validateObjId.js";
const router = express.Router();

router.post(
  "/",
  initValidationErrorBucket,
  whitelisting({
    required: ["user", "title", "content"],
    optional: ["type", "isPrivate"],
  }),
  checkErrors,
  createNote,
);
router.get("/", pagination, getAllNotes);
router.get(
  "/:id",
  initValidationErrorBucket,
  validateObjId,
  checkErrors,
  getNote,
);
router.patch(
  "/:id",
  initValidationErrorBucket,
  validateObjId,
  whitelisting({
    required: ["user", "title", "content"],
    optional: ["type", "isPrivate"],
  }),
  checkErrors,
  updateNote,
);
router.delete(
  "/:id",
  initValidationErrorBucket,
  validateObjId,
  checkErrors,
  deleteNote,
);

export default router;
